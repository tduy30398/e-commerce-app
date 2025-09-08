'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, LoaderCircle, SendHorizonal } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios';
import { AxiosResponse } from 'axios';

interface ChatMessageInputProps {
  activeUserId: string;
  sendMessage: (to: string, message: string, type?: 'text' | 'image') => void;
}

interface FormChatProps {
  message: string;
}

const ChatMessageInput = ({
  activeUserId,
  sendMessage,
}: ChatMessageInputProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const method = useForm<FormChatProps>({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: FormChatProps) => {
    if (!data.message.trim()) return;

    sendMessage(activeUserId, data.message);
    method.resetField('message');
    inputRef.current?.focus();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size is too large. Please upload a file smaller 5MB!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const res: AxiosResponse<{ url: string }> = await axiosInstance.post(
        '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.url) {
        sendMessage(activeUserId, res.data.url, 'image');
      }
    } catch (err) {
      toast.error('Upload failed: ' + err);
    } finally {
      setIsLoading(false);
      e.target.value = '';
    }
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form {...method}>
      <form
        onSubmit={method.handleSubmit(onSubmit)}
        className={cn(
          'border-t flex items-center relative',
          activeUserId ? '' : 'hidden'
        )}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer text-gray-500 h-11! shrink-0 absolute left-0 border-none shadow-none outline-none bg-transparent hover:bg-transparent hover:opacity-80"
            >
              <ImageIcon className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-sm">Upload image up to 5MB</p>
          </TooltipContent>
        </Tooltip>
        <FormField
          name="message"
          control={method.control}
          render={({ field: { onChange, value } }) => (
            <FormItem className="flex-1">
              <FormControl>
                <input
                  placeholder="Type a message..."
                  value={value}
                  onChange={onChange}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && method.handleSubmit(onSubmit)()
                  }
                  className="text-lg! h-11! px-12 outline-none"
                  ref={inputRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isLoading ? (
          <LoaderCircle className="size-6 animate-spin" />
        ) : (
          <Button
            type="submit"
            variant="outline"
            disabled={!method.watch('message') || activeUserId === ''}
            className="cursor-pointer h-11! shrink-0 text-blue-500 hover:text-blue-500 absolute right-0 border-none outline-none bg-transparent hover:bg-transparent hover:opacity-80"
          >
            <SendHorizonal className="size-6" />
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ChatMessageInput;
