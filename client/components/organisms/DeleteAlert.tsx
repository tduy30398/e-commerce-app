'use client'

import React from 'react'
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
import { Trash2 } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { mutate } from 'swr';
import { toast } from "sonner"

interface DeleteAlertProps {
    id: string;
}


const DeleteAlert: React.FC<DeleteAlertProps> = ({ id }: { id: string }) => {

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/product/${id}`);
            mutate('/api/product');
            toast("Sucessfully deleted!", {
                duration: 2000,
                style: { backgroundColor: '#a0ffa0', color: '#000', textAlign: 'center' }
            })
        } catch (err) {
            console.error(err);
            alert('Error has occurred when delete');
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