'use client'

import { Trash2 } from 'lucide-react';
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
import { deleteProduct } from '@/service/product';
import useSWRMutation from 'swr/mutation';

interface DeleteAlertProps {
    id: string;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({ id }: { id: string }) => {
    const {
        trigger: deleteProductTrigger,
        isMutating: deleteLoading,
        error: deleteError
    } = useSWRMutation('/api/product', deleteProduct, {
        onSuccess: () => {
            mutate('/api/product');
            toast.success('Delete product success');
        },
        onError: () => {
            toast.error('Update product failed');
        }
    });

    if (deleteError) {
        toast.error('Delete product failed');
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
                    <AlertDialogAction
                        disabled={deleteLoading}
                        onClick={() => deleteProductTrigger({ id })}
                        className="cursor-pointer"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAlert