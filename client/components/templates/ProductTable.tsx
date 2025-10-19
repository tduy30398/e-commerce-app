'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import useSWR from 'swr';
import React from 'react';
import { getAllProducts } from '@/actions/product';
import TableSkeleton from '@/components/molecules/TableSkeleton';
import DeleteAlert from '@/components/organisms/DeleteAlert';
import PaginationCustom from '@/components/molecules/PaginationCustom';
import { useSearchParams } from 'next/navigation';
import useProfileStore from '@/store/useProfileStore';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
// import { useSession } from 'next-auth/react';
import { Link, useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface DataTableProps {
  [key: string]: string | number;
}

interface TableColumn {
  key: string;
  label: string;
}

const PAGE_SIZE = 10;

const ProductTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const { profileData, accessToken, isLoggingOut, hydrated } =
    useProfileStore();
  // const { data: session } = useSession();
  const t = useTranslations('product');

  const currentPage = React.useMemo(() => {
    return pageParam ? parseInt(pageParam, 10) : 1;
  }, [pageParam]);

  const queryKey = ['product', currentPage];

  const {
    data: products,
    isLoading,
  } = useSWR(
    queryKey,
    () => getAllProducts({ page: currentPage, limit: PAGE_SIZE }),
    {
      revalidateOnFocus: false,
      onError: () => {
        toast.error(t('loadFail'));
      },
    }
  );

  const updatePage = React.useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.replace(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const handleNext = React.useCallback(() => {
    if (products && currentPage < products.pagination.totalPages) {
      updatePage(currentPage + 1);
    }
  }, [currentPage, products, updatePage]);

  const handlePrev = React.useCallback(() => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  }, [currentPage, updatePage]);

  const tableCoulmn: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: t('name'),
    },
    {
      key: 'description',
      label: t('description'),
    },
    {
      key: 'price',
      label: t('price'),
    },
    {
      key: 'rating',
      label: t('rating'),
    },
  ];

  const tableData = React.useMemo(() => {
    if (!products) return [];

    return products.data.map((product) => ({
      id: product._id,
      name: product.name,
      description:
        product.description.length > 20
          ? product.description.slice(0, 20) + '...'
          : product.description,
      price: product.price,
      rating: product.rating.toFixed(1),
    }));
  }, [products]);

  React.useEffect(() => {
    if (!pageParam) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  React.useEffect(() => {
    if (!hydrated) return;

    if (!accessToken && !isLoggingOut) {
      router.replace(ROUTES.LOGIN);
    }
  }, [accessToken, router, isLoggingOut, hydrated]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">{t('productList')}</h2>
        {profileData?.role === 'admin' && (
          <Link
            href={`${ROUTES.ADMIN_PRODUCT}/create`}
            className="bg-black text-white px-10 py-2 rounded-4xl h-9 leading-4.5"
          >
            {t('create')}
          </Link>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableCoulmn.map((column) => (
              <TableHead
                key={column.key}
                className={column.key === 'id' ? 'max-w-20 truncate' : ''}
              >
                {column.label}
              </TableHead>
            ))}
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item: DataTableProps) => (
            <TableRow key={item.id}>
              {tableCoulmn.map((column) => (
                <TableCell
                  className={column.key === 'id' ? 'max-w-20 truncate' : ''}
                  key={column.key}
                >
                  {item[column.key]}
                </TableCell>
              ))}
              <TableCell className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`${ROUTES.ADMIN_PRODUCT}/${item.id}`}
                      className="cursor-pointer"
                    >
                      <Eye className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('detail')}</p>
                  </TooltipContent>
                </Tooltip>
                {profileData?.role === 'admin' && (
                  <DeleteAlert id={String(item.id)} queryKey={queryKey} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationCustom
        onNext={handleNext}
        onPrev={handlePrev}
        totalPages={products?.pagination.totalPages || 1}
        current={currentPage}
        setPage={updatePage}
      />
    </>
  );
};

export default ProductTable;
