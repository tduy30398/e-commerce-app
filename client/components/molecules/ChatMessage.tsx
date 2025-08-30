'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

interface FormChatProps {
  message: string;
}

const ChatMessage = () => {
  const method = useForm<FormChatProps>({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: FormChatProps) => {
    console.log(data.message);
  };

  return (
    <Form {...method}>
      <form
        onSubmit={method.handleSubmit(onSubmit)}
        className="p-3 border-t flex gap-2"
      >
        <FormField
          name="message"
          control={method.control}
          render={({ field: { onChange, value } }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Type a message..."
                  value={value}
                  onChange={onChange}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && method.handleSubmit(onSubmit)()
                  }
                  className="text-lg! h-11!"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!method.watch('message')}
          className="text-base cursor-pointer h-11! shrink-0"
        >
          Send
        </Button>
      </form>
    </Form>
  );
};

export default ChatMessage;
