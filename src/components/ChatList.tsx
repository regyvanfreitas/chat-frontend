import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Chat } from "../types";
import { ChatItem } from "./ChatItem";
import { ChatSvg } from "./Icons";
import { ChatListSkeleton } from "./SkeletonLoaders";

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  isLoading: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onChatSelect,
  isLoading,
}) => {
  const sortedChats = React.useMemo(() => {
    if (!chats || chats.length === 0) return [];

    return [...chats]
      .filter((chat) => chat && chat.id)
      .sort((a, b) => {
        const aDate = a.lastMessage?.createdAt
          ? new Date(a.lastMessage.createdAt)
          : new Date(a.createdAt);

        const bDate = b.lastMessage?.createdAt
          ? new Date(b.lastMessage.createdAt)
          : new Date(b.createdAt);

        return bDate.getTime() - aDate.getTime();
      });
  }, [chats]);

  if (isLoading) {
    return <ChatListSkeleton />;
  }

  if (chats?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-500 px-4">
        <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
          <ChatSvg className="w-6 h-6 text-blue-500" />
        </div>
        <p className="text-sm font-medium text-gray-900">Nenhuma conversa</p>
        <p className="text-xs text-gray-500 mt-1 text-center">
          Clique no + para criar sua primeira conversa
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto py-2">
      <AnimatePresence mode="popLayout">
        {sortedChats.map((chat) => (
          <motion.div
            key={chat.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              layout: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 },
              y: { duration: 0.2 },
            }}
          >
            <ChatItem
              chat={chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => onChatSelect(chat)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
