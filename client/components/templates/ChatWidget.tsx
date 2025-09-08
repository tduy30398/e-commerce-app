/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareText, SquareArrowDown } from 'lucide-react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
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
import ChatMessageInput from '../molecules/ChatMessageInput';
import { useChatStore } from '@/store/useChatStore';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const { messages, setMessages, prependMessages } = useChatStore();
  const { profileData, accessToken } = useProfileStore();
  const { sendMessage } = useChatSocket();

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

  const conversation = React.useMemo(() => {
    return messages[selectedUser] || [];
  }, [messages, selectedUser]);

  const loadMoreMessages = async () => {
    if (!selectedUser || !hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const res = await getChatHistory(selectedUser, {
        page: page + 1,
      });

      prependMessages(selectedUser, res.data);
      setPage((p) => p + 1);

      if (res.pagination.page >= res.pagination.totalPages) {
        setHasMore(false);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    if (target.scrollTop === 0 && hasMore && !loadingMore) {
      const prevScrollHeight = target.scrollHeight;

      await loadMoreMessages();

      // Restore position so user stays in same place
      requestAnimationFrame(() => {
        target.scrollTop = target.scrollHeight - prevScrollHeight;
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Prevent scroll jump while user is reading older messages
  const isNearBottom = () => {
    if (!messagesEndRef.current) return true;
    const { scrollTop, clientHeight, scrollHeight } =
      messagesEndRef.current.parentElement!;
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  React.useEffect(() => {
    if (selectedUser && chatHistory) {
      setMessages(selectedUser, chatHistory?.data || []);
    }
  }, [selectedUser, chatHistory, setMessages]);

  React.useEffect(() => {
    if (selectedUser) {
      setPage(1);
      setHasMore(true);
    }
  }, [selectedUser]);

  // scroll to bottom with image
  React.useEffect(() => {
    if (conversation.length === 0) return;

    const lastMsg = conversation[conversation.length - 1];
    const container = messagesEndRef.current?.parentElement;

    // if last message is NOT an image → normal scroll
    if (lastMsg.type !== 'image') {
      if (isNearBottom()) scrollToBottom();
      return;
    }

    // if last message is an image → wait until it's loaded
    const img = container?.querySelector<HTMLImageElement>(
      `img[src="${lastMsg.content}"]`
    );

    if (img) {
      if (img.complete) {
        // already loaded
        requestAnimationFrame(() => scrollToBottom());
      } else {
        // onload event fires when image finishes loading
        img.onload = () => {
          requestAnimationFrame(() => scrollToBottom());
        };
      }
    }
  }, [conversation]);

  return (
    <div
      className={cn('fixed bottom-0 right-2 z-50', accessToken ? '' : 'hidden')}
    >
      <Button
        variant="outline"
        className="shadow-lg absolute bottom-0 right-2 cursor-pointer bg-white py-2! px-4! h-fit! rounded-b-none"
        onClick={() => setIsOpen(true)}
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
            className="absolute bottom-0 right-0! sm:right-2"
          >
            <Card className="py-0 gap-0 flex rounded-sm shadow-xl">
              <div className="flex items-center justify-between p-3 border-b">
                <p className="text-2xl font-semibold">Chat</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-none shadow-none cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedUser('');
                    setPage(1);
                    setHasMore(true);
                  }}
                >
                  <SquareArrowDown className="cursor-pointer size-6" />
                </Button>
              </div>
              <div className="max-md:flex-col flex w-[95vw] h-[80vh] md:w-[642px] md:h-[500px] overflow-hidden">
                <div className="w-full md:w-2/5 border-r md:bg-gray-50">
                  {!isLoading ? (
                    <ScrollArea className="h-full md:h-full md:overflow-y-auto overflow-x-auto">
                      <div className="flex md:flex-col max-md:p-4 max-md:gap-4">
                        {users?.data && users?.data.length > 0 ? (
                          users.data
                            .filter((user) => user._id !== profileData?._id)
                            .map((user) => (
                              <UserItem
                                key={user._id}
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
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="md:hidden"
                      />
                      <ScrollBar
                        orientation="vertical"
                        className="hidden md:block"
                      />
                    </ScrollArea>
                  ) : (
                    <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <ChatUserSkeleton key={i} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col w-full md:w-3/5 h-full">
                  {selectedUser ? (
                    <div
                      className="flex-1 p-3 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gray-300"
                      onScroll={handleScroll}
                    >
                      {loadingChatHistory ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <ChatItemSkeleton key={i} isOwn={i % 2 === 0} />
                        ))
                      ) : conversation.length > 0 ? (
                        <>
                          {loadingMore ? (
                            <p className="text-center text-gray-500">
                              Loading...
                            </p>
                          ) : null}
                          {conversation.map((msg) => (
                            <ChatItem key={msg._id} msg={msg} />
                          ))}
                          <div ref={messagesEndRef} />
                        </>
                      ) : (
                        <div className="flex-center flex-col">
                          <p className="font-bold text-xl mt-4">
                            Start a conversation
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex-col flex-center">
                      <img src="icons/chat-welcome.svg" alt="welcome chat" />
                      <p className="font-bold text-xl mt-4">
                        Welcome to the SHOP.CO chat
                      </p>
                    </div>
                  )}
                  <ChatMessageInput
                    sendMessage={sendMessage}
                    activeUserId={selectedUser}
                  />
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
