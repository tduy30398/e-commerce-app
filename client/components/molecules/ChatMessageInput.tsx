'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { SendHorizonal } from 'lucide-react';

interface ChatMessageInputProps {
  activeUserId: string;
  sendMessage: (to: string, message: string) => void;
}

interface FormChatProps {
  message: string;
}

const ChatMessageInput = ({
  activeUserId,
  sendMessage,
}: ChatMessageInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const method = useForm<FormChatProps>({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: FormChatProps) => {
    sendMessage(activeUserId, data.message);
    method.resetField('message');
    inputRef.current?.focus();
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form {...method}>
      <form
        onSubmit={method.handleSubmit(onSubmit)}
        className={cn('p-3 border-t flex gap-2', activeUserId ? '' : 'hidden')}
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
                  ref={inputRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={!method.watch('message') || activeUserId === ''}
          className="text-base cursor-pointer h-11! shrink-0 text-blue-500 hover:text-blue-500"
        >
          <SendHorizonal className='size-6' />
        </Button>
      </form>
    </Form>
  );
};

export default ChatMessageInput;
