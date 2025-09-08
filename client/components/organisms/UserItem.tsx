import { UserProfile } from '@/actions/authenticate/type';
import { cn } from '@/lib/utils';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useChatStore } from '@/store/useChatStore';
import { getChatHistory } from '@/actions/message';
import useSWR from 'swr';
import { ChatUserSkeleton } from '../molecules/ChatUserSkeleton';

interface UserItemProps {
  user: UserProfile;
  selectedUser: string;
  setSelectedUser: (id: string) => void;
}

const UserItem = ({ user, selectedUser, setSelectedUser }: UserItemProps) => {
  const { messages } = useChatStore();

  const { data: chatHistory, isLoading: loadingChatHistory } = useSWR(
    user._id ? ['chat-history-detail', user._id] : null,
    () => getChatHistory(user._id, { limit: 1 }),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  const lastMessage = React.useMemo(() => {
    const userMessages = messages[user._id] || [];
    let lastMessage;
    if (userMessages[userMessages.length - 1].type === 'image') {
      lastMessage = "Image";
    } else {
      lastMessage = userMessages[userMessages.length - 1]?.content
    };

    return (
      lastMessage ||
      chatHistory?.data?.[0]?.content ||
      ''
    );
  }, [messages, user._id, chatHistory]);

  if (loadingChatHistory) return <ChatUserSkeleton />;

  return (
    <div
      onClick={() => setSelectedUser(user._id)}
      className={cn(
        'flex items-center gap-2 w-fit max-md:rounded-full md:w-full cursor-pointer md:p-3 hover:bg-gray-200',
        selectedUser === user._id && 'md:bg-gray-200'
      )}
    >
      <Avatar className="size-12 md:size-9 shrink-0">
        {user.avatar ? (
          <AvatarImage src={user.avatar} alt={user?.name} />
        ) : null}
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-0 flex-1 max-md:hidden">
        <p className="truncate text-base">{user.name}</p>
        <p className="truncate text-sm text-gray-500">{lastMessage}</p>
      </div>
    </div>
  );
};

export default UserItem;
