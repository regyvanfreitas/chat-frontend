import React from "react";
import type { Chat } from "../types";
import { ChatItem } from "./ChatItem";

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
  console.log(chats);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (chats?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-500">
        <svg
          className="w-12 h-12 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="text-sm">Nenhum chat encontrado</p>
        <p className="text-xs mt-1">Crie um novo chat para começar</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {chats
        ?.filter((chat) => chat && chat.id)
        ?.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isSelected={selectedChat?.id === chat.id}
            onClick={() => onChatSelect(chat)}
          />
        ))}
    </div>
  );
};
