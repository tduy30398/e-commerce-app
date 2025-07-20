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

interface DataTableProps {
  [key: string]: string | number;
}

interface TableColumn {
  key: string;
  label: string;
}

const PAGE_SIZE = 10;

const ProductDashboard = () => {
  const [page, setPage] = React.useState(1);

  const queryKey = ['/api/product', { page, limit: PAGE_SIZE }];

  const {
    data: products,
    isLoading,
    error,
  } = useSWR(queryKey, () => getAllProducts({ page, limit: PAGE_SIZE }), {
    revalidateOnFocus: false,
  });

  const handleNext = () => {
    if (products?.panigation && page < products.panigation.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
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

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) return <div>Failed to load data. Error: {error.message}</div>;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Products List</h2>
        <Link
          href="/admin/product/create"
          className="bg-black text-white px-4 py-2 rounded-md h-9 leading-[18px]"
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
        totalPages={products?.panigation.totalPages || 1}
        current={page}
        setPage={setPage}
      />
    </>
  );
};

export default ProductDashboard;
