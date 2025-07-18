'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import DeleteAlert from "../organisms/DeleteAlert";
import useSWR from "swr";
import PaginationCustom from "../molecules/PaginationCustom";
import React from "react";
import TableSkeleton from "../molecules/TableSkeleton";
import { getAllProducts } from "@/service/product";

interface DataTableProps {
    [key: string]: string | number;
}

interface TableColumn {
    key: string;
    label: string;
}

const PAGE_SIZE = 10;

export const ProductTable: React.FC = () => {
    const [current, setCurrentPage] = React.useState<number>(1);
    const { data: products, isLoading, error } = useSWR('/api/product', getAllProducts)
    const totalPages = products ? Math.ceil(products?.length / PAGE_SIZE) : 0;

    const paginatedData = products?.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
    const fillerRows = paginatedData ? PAGE_SIZE - paginatedData?.length : 0;

    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const tableCoulmn: TableColumn[] = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'price',
            label: 'Price'
        },
        {
            key: 'rating',
            label: 'Rating'
        }
    ]

    const tableData = React.useMemo(() => {
        if (!paginatedData) return [];

        return paginatedData.map((product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            rating: product.rating
        }))
    }, [paginatedData])

    if (isLoading) {
        return <TableSkeleton />
    };

    if (error) return <div>Failed to load data. Error: {error.message}</div>;

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableCoulmn.map((column) => (
                            <TableHead key={column.key} className={column.key === "id" ? "max-w-[80px] truncate" : ""}>{column.label}</TableHead>
                        ))}
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((item: DataTableProps) => (
                        <TableRow key={item.id}>
                            {tableCoulmn.map((column) => (
                                <TableCell className={column.key === "id" ? "max-w-[80px] truncate" : ""} key={column.key}>{item[column.key]}</TableCell>
                            ))}
                            <TableCell className="flex gap-2">
                                <Link href={`${ROUTES.ADMINPRODUCT}/${item.id}`} className="cursor-pointer">
                                    <Eye className="size-4" />
                                </Link>
                                <DeleteAlert id={String(item.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                    {Array.from({ length: fillerRows }).map((_, i) => (
                        <TableRow
                            key={`filler-${i}`}
                            className="pointer-events-none border-none"
                        >
                            <TableCell colSpan={3}>&nbsp;</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationCustom
                onNext={handleNextPage}
                onPrev={handlePrevPage}
                totalPages={totalPages}
                current={current}
                setPage={setCurrentPage}
            />
        </>
    );
}
