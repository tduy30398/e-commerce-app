/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareText, SquareArrowDown } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import ChatMessage from '../molecules/ChatMessage';
import useProfileStore from '@/store/useProfileStore';
import { cn } from '@/lib/utils';
import useSWR from 'swr';
import { getAllUsers } from '@/actions/user';
import { ChatUserSkeleton } from '../molecules/ChatUserSkeleton';
import { useChatSocket } from '@/lib/useChatSocket';
import { getChatHistory } from '@/actions/message';
import UserItem from '../organisms/UserItem';
import ChatItem from '../organisms/ChatItem';
import ChatItemSkeleton from '../molecules/ChatItemSkeleton';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<string>('');

  const { profileData, accessToken } = useProfileStore();
  const { messages } = useChatSocket(selectedUser || null);

  const { data: users, isLoading } = useSWR(
    isOpen ? ['users'] : null,
    () =>
      getAllUsers({ role: profileData?.role === 'admin' ? 'user' : 'admin' }),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: chatHistory, isLoading: loadingChatHistory } = useSWR(
    selectedUser && isOpen ? ['chat-history', selectedUser] : null,
    () => getChatHistory(selectedUser),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  const fullChatConversation = React.useMemo(() => {
    return chatHistory?.concat(messages || []) || [];
  }, [messages, chatHistory]);

  return (
    <div
      className={cn('fixed bottom-0 right-2 z-50', accessToken ? '' : 'hidden')}
    >
      <Button
        variant="outline"
        className="shadow-lg absolute bottom-0 right-2 cursor-pointer bg-white py-2! px-4! h-fit! rounded-b-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquareText className="size-6 text-black" />
        <p className="text-xl font-semibold">Chat</p>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.2,
              transformOrigin: 'bottom right',
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute bottom-0 right-2"
          >
            <Card className="py-0 gap-0 flex rounded-sm shadow-xl">
              <div className="flex items-center justify-between p-3 border-b">
                <p className="text-2xl font-semibold">Chat</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-none shadow-none cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <SquareArrowDown className="cursor-pointer size-5" />
                </Button>
              </div>
              <div className="flex w-[642px] h-[600px] overflow-hidden">
                <div className="w-2/5 border-r bg-gray-50">
                  {!isLoading ? (
                    <ScrollArea className="h-full">
                      {users?.data && users?.data.length > 0 ? (
                        users.data
                          .filter((user) => user._id !== profileData?._id)
                          .map((user, idx) => (
                            <UserItem
                              key={idx}
                              user={user}
                              selectedUser={selectedUser}
                              setSelectedUser={setSelectedUser}
                            />
                          ))
                      ) : (
                        <p className="text-center text-gray-500">
                          No users found
                        </p>
                      )}
                    </ScrollArea>
                  ) : (
                    Array.from({ length: 5 }).map((_, i) => (
                      <ChatUserSkeleton key={i} />
                    ))
                  )}
                </div>

                <div className="flex flex-col w-3/5 h-full">
                  {selectedUser ? (
                    <ScrollArea className="flex-1 p-3 overflow-auto">
                      {!loadingChatHistory ? (
                        fullChatConversation.length > 0 ? (
                          fullChatConversation.map((msg) => (
                            <ChatItem key={msg._id} msg={msg} />
                          ))
                        ) : (
                          <div className="flex-center flex-col">
                            <p className="font-bold text-xl mt-4">
                              Start a conversation
                            </p>
                          </div>
                        )
                      ) : (
                        Array.from({ length: 4 }).map((_, i) => (
                          <ChatItemSkeleton key={i} isOwn={i % 2 === 0} />
                        ))
                      )}
                    </ScrollArea>
                  ) : (
                    <div className="h-full flex-col flex-center">
                      <img src="icons/chat-welcome.svg" alt="welcome chat" />
                      <p className="font-bold text-xl mt-4">
                        Welcome to the SHOP.CO chat
                      </p>
                    </div>
                  )}
                  <ChatMessage activeUserId={selectedUser || ''} />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
