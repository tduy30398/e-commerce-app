import { ChatMessage } from '@/lib/useChatSocket';
import { cn } from '@/lib/utils';
import useProfileStore from '@/store/useProfileStore';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { format } from 'date-fns';

interface ChatItemProps {
  msg: ChatMessage;
}

const ChatItem = ({ msg }: ChatItemProps) => {
  const { profileData } = useProfileStore();

  return (
    <div
      className={cn(
        'mb-2 flex',
        msg.from === profileData?._id ? 'justify-end' : 'justify-start'
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'rounded-lg max-w-4/5 px-3 py-2 text-base shadow-md',
              msg.from === profileData?._id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-900'
            )}
          >
            {msg.content}
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{format(new Date(msg.createdAt), 'EEEE HH:mm')}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ChatItem;
