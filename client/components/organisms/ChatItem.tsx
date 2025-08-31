import { ChatMessage } from '@/lib/useChatSocket';
import { cn } from '@/lib/utils';
import useProfileStore from '@/store/useProfileStore';
import React from 'react';

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
    </div>
  );
};

export default ChatItem;
