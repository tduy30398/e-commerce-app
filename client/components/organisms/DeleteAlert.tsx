'use client';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
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
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { deleteProduct } from '@/actions/product';
import useSWRMutation from 'swr/mutation';
import { useTranslations } from 'next-intl';

interface DeleteAlertProps {
  id: string;
  queryKey: (string | number)[];
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({ id, queryKey }) => {
  const t = useTranslations('product');

  const { trigger: deleteProductTrigger, isMutating: deleteLoading } =
    useSWRMutation('product', deleteProduct, {
      onSuccess: () => {
        mutate(queryKey);
        toast.success(t('deleteSuccess'));
      },
      onError: () => {
        toast.error(t('deleteFail'));
      },
    });

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Trash2 className="cursor-pointer size-5" />
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('delete')}</p>
        </TooltipContent>
      </Tooltip>
      <AlertDialogContent className="top-10 left-1/2 -translate-x-1/2 translate-y-0">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('confirm')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            {t('confirmContent')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteLoading}
            onClick={() => deleteProductTrigger({ id })}
            className="cursor-pointer bg-[#f5232f] hover:bg-[#f28d92]"
          >
            {t('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
