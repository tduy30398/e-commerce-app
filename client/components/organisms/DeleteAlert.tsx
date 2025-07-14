'use client'

import axiosInstance from '@/lib/axios';
import { CircleCheck, Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from "sonner";
import { mutate } from 'swr';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../ui/alert-dialog";

interface DeleteAlertProps {
    id: string;
}


const DeleteAlert: React.FC<DeleteAlertProps> = ({ id }: { id: string }) => {
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/product/${id}`);
            mutate('/api/product');
            toast.success('Product deleted successfully', {
                icon: <CircleCheck className="text-green-500" />,
            });
        } catch (err) {
            console.error(err);
            toast.error('Error has occurred when delete');
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash2 className="cursor-pointer size-4" />
            </AlertDialogTrigger>
            <AlertDialogContent className='top-10 left-1/2 -translate-x-1/2 translate-y-0'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete this record?</AlertDialogTitle>
                    <AlertDialogDescription className="text-black">
                        This action cannot be undone. This will permanently delete your
                        record from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="cursor-pointer">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAlert