import React from "react";
import type { Chat } from "../types";
import { useAuth } from "../hooks/useAuth";

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isSelected,
  onClick,
}) => {
  const { user } = useAuth();
  const formatTime = (date: string): string => {
    const messageDate = new Date(date);
    const now = new Date();
    const isToday = messageDate.toDateString() === now.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  const getChatName = (): string => {
    if (chat.isGroup) {
      return chat.name || "Grupo sem nome";
    }

    const otherParticipant = chat.participants.find(
      (participant) => participant.id !== user?.id
    );

    return otherParticipant?.name || "Usuário desconhecido";
  };

  const getChatAvatar = (): string => {
    if (chat.isGroup) {
      return (chat.name || "G").charAt(0).toUpperCase();
    }

    const otherParticipant = chat.participants.find(
      (participant) => participant.id !== user?.id
    );

    return (otherParticipant?.name || "?").charAt(0).toUpperCase();
  };

  const getLastMessagePreview = (): string => {
    if (!chat.lastMessage) {
      return "Nenhuma mensagem ainda";
    }

    const maxLength = 40;
    const content = chat.lastMessage.content;
    return content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-blue-50 border-blue-200" : ""
      }`}
    >
      <div className="shrink-0">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-medium">{getChatAvatar()}</span>
        </div>
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {getChatName()}
          </h3>
          {chat.lastMessage && (
            <span className="text-xs text-gray-500">
              {formatTime(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 truncate mt-1">
          {getLastMessagePreview()}
        </p>
      </div>
    </div>
  );
};
