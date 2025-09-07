/* eslint-disable @next/next/no-img-element */
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

  const isOwn = msg.from === profileData?._id;
  const isImage = msg.type === 'image';

  return (
    <div className={cn('mb-2 flex', isOwn ? 'justify-end' : 'justify-start')}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'rounded-lg max-w-4/5 text-base shadow-md break-words',
              isOwn ? 'bg-blue-500 text-white' : 'bg-white text-gray-900',
              !isImage ? 'px-3 py-2' : ''
            )}
          >
            {isImage ? (
              <img
                src={msg.content}
                alt="chat image"
                className="max-w-xs max-h-60 rounded-md cursor-pointer"
              />
            ) : (
              msg.content
            )}
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
