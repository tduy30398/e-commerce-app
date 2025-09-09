/* eslint-disable @next/next/no-img-element */
import { ChatMessage } from '@/lib/useChatSocket';
import { cn } from '@/lib/utils';
import useProfileStore from '@/store/useProfileStore';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { format } from 'date-fns';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ChatItemProps {
  msg: ChatMessage;
}

const ChatItem = ({ msg }: ChatItemProps) => {
  const { profileData } = useProfileStore();
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const isOwn = msg.from === profileData?._id;
  const isImage = msg.type === 'image';

  return (
    <>
      <div className={cn('mb-2 flex', isOwn ? 'justify-end' : 'justify-start')}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'rounded-lg max-w-4/5 shadow-md',
                isImage ? null : 'px-3 py-2 bg-blue-500 break-words text-white text-base'
              )}
            >
              {isImage ? (
                <img
                  src={msg.content}
                  alt="chat image"
                  onClick={() => setPreviewOpen(true)}
                  className="max-h-60 rounded-md cursor-pointer"
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
      {isImage && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent
            showCloseButton={false}
            className="p-0 bg-transparent border-none shadow-none flex items-center justify-center"
          >
            <VisuallyHidden>
              <DialogTitle>Image preview</DialogTitle>
            </VisuallyHidden>
            <DialogClose asChild>
              <button
                aria-label="Close image preview"
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition cursor-pointer outline-none"
              >
                <X className="size-5" />
              </button>
            </DialogClose>
            <img
              src={msg.content}
              alt="chat preview"
              className="w-full h-full object-contain rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ChatItem;
