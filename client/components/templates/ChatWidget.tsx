'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareText, SquareArrowDown } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ChatMessage from '../molecules/ChatMessage';

const messages = [
  {
    from: 'user',
    text: 'Bạn đặt hàng có in, vui lòng chọn “SIZE (SỐ KÝ) - IN TÊN SỐ” => THÊM VÀO GIỎ HÀNG => ĐẶT HÀNG Sau đó vào đây nhắn cho shop số điện thoại và nội dung tên số cần in. (Nhắn trực tiếp vào tin nhắn này)Sẽ có nhân viên bên shop liên hệ bạn để xác nhận đơn sau ạ. Xin cảm ơn!',
  },
  {
    from: 'me',
    text: 'git reset does know five "modes": soft, mixed, hard, merge and keep. I will start with the first three, since these are the modes you usually encounter. After that youll find a nice little a bonus, so stay tuned.!',
  },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const users = [
    'Alice Alice Alice Alice Alice Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
  ];

  return (
    <div className="fixed bottom-0 right-2 z-50">
      <Button
        variant="outline"
        className="shadow-lg absolute bottom-0 right-2 cursor-pointer bg-white p-2! h-fit!"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquareText className="size-7 text-black" />
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
                  <ScrollArea className="h-full">
                    {users.map((user, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 w-full cursor-pointer p-3 hover:bg-gray-200"
                      >
                        <Avatar className="size-9 shrink-0">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col w-0 flex-1">
                          <p className="truncate text-base">{user}</p>
                          <p className="truncate text-sm text-gray-500">
                            git reset does know five: soft, mixed, hard, merge
                            and keep.
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div className="flex flex-col w-3/5 h-full">
                  {/* Chat History */}
                  <ScrollArea className="flex-1 p-3 overflow-auto">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`mb-2 flex${
                          msg.from === 'me' ? ' justify-end' : ' justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-lg max-w-4/5 px-3 py-2 text-base shadow-md ${
                            msg.from === 'me'
                              ? ' bg-blue-500 text-white'
                              : ' bg-gray-200 text-gray-900'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <ChatMessage />
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
