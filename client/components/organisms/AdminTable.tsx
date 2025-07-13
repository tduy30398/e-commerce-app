/* eslint-disable @typescript-eslint/no-explicit-any */
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
import DeleteAlert from "./DeleteAlert";

export interface DataTableProps {
    [key: string]: string | number;
}

export interface TableColumn {
    key: string;
    label: string;
}

export interface AdminTableProps {
    columns: TableColumn[];
    data: DataTableProps[];
}

export const AdminTable: React.FC<AdminTableProps> = ({ columns, data }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.key} className={column.key === "id" ? "max-w-[80px] truncate" : ""}>{column.label}</TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {columns.map((column) => (
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
            </TableBody>
        </Table>
    );
}
