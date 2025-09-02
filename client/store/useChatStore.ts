import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatMessage } from '@/lib/useChatSocket';
import { STORAGE } from '@/lib/constants';

interface ChatState {
  messages: Record<string, ChatMessage[]>;
  addMessage: (msg: ChatMessage, currentUserId: string) => void;
  setMessages: (userId: string, msgs: ChatMessage[]) => void;
  prependMessages: (userId: string, msgs: ChatMessage[]) => void;
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

      prependMessages: (userId, msgs) =>
        set(
          (state) => ({
            messages: {
              ...state.messages,
              // remove duplicate messages by _id
              [userId]: [
                ...msgs.filter(
                  (m) =>
                    !(state.messages[userId] || []).some(
                      (existing) => existing._id === m._id
                    )
                ),
                ...(state.messages[userId] || []),
              ],
            },
          }),
          false,
          `prependMessages(${userId})`
        ),
    }),
    {
      name: STORAGE.CHAT,
    }
  )
);
