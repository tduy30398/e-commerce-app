import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatMessage } from '@/lib/useChatSocket';
import { STORAGE } from '@/lib/constants';

interface ChatState {
  messages: Record<string, ChatMessage[]>;
  addMessage: (msg: ChatMessage, currentUserId: string) => void;
  setMessages: (userId: string, msgs: ChatMessage[]) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      messages: {},

      addMessage: (msg, currentUserId) =>
        set(
          (state) => {
            // Always add to the other user's messages
            const otherUserId = msg.from === currentUserId ? msg.to : msg.from;

            return {
              messages: {
                ...state.messages,
                [otherUserId]: [...(state.messages[otherUserId] || []), msg],
              },
            };
          },
          false,
          'addMessage'
        ),

      setMessages: (userId, msgs) =>
        set(
          (state) => ({
            messages: { ...state.messages, [userId]: msgs },
          }),
          false,
          `setMessages(${userId})`
        ),
    }),
    {
      name: STORAGE.CHAT,
    }
  )
);
