'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import useSWR from 'swr';
import React from 'react';
import { getAllProducts } from '@/actions/product';
import TableSkeleton from '@/components/molecules/TableSkeleton';
import DeleteAlert from '@/components/organisms/DeleteAlert';
import PaginationCustom from '@/components/molecules/PaginationCustom';
import { useRouter, useSearchParams } from 'next/navigation';

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

  const currentPage = React.useMemo(() => {
    return pageParam ? parseInt(pageParam, 10) : 1;
  }, [pageParam]);

  const queryKey = ['/api/product', currentPage];

  const {
    data: products,
    isValidating,
    error,
  } = useSWR(
    queryKey,
    () => getAllProducts({ page: currentPage, limit: PAGE_SIZE }),
    {
      revalidateOnFocus: false,
    }
  );

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.replace(`?${params.toString()}`);
  };

  const handleNext = () => {
    if (products && currentPage < products.pagination.totalPages) {
      updatePage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  };

  const tableCoulmn: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'price',
      label: 'Price',
    },
    {
      key: 'rating',
      label: 'Rating',
    },
  ];

  const tableData = React.useMemo(() => {
    if (!products) return [];

    return products.data.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      rating: product.rating,
    }));
  }, [products]);

  React.useEffect(() => {
    if (!pageParam) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
  }, [pageParam, router, searchParams]);

  if (isValidating) {
    return <TableSkeleton />;
  }

  if (error) return <div>Failed to load data. Error: {error.message}</div>;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Products List</h2>
        <Link
          href={`${ROUTES.ADMINPRODUCT}/create`}
          className="bg-black text-white px-10 py-2 rounded-4xl h-9 leading-[18px]"
        >
          Create
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableCoulmn.map((column) => (
              <TableHead
                key={column.key}
                className={column.key === 'id' ? 'max-w-[80px] truncate' : ''}
              >
                {column.label}
              </TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item: DataTableProps) => (
            <TableRow key={item.id}>
              {tableCoulmn.map((column) => (
                <TableCell
                  className={column.key === 'id' ? 'max-w-[80px] truncate' : ''}
                  key={column.key}
                >
                  {item[column.key]}
                </TableCell>
              ))}
              <TableCell className="flex gap-2">
                <Link
                  href={`${ROUTES.ADMINPRODUCT}/${item.id}`}
                  className="cursor-pointer"
                >
                  <Eye className="size-4" />
                </Link>
                <DeleteAlert id={String(item.id)} queryKey={queryKey} />
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
