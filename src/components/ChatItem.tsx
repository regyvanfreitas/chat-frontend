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
      className={`flex items-center p-4 mx-3 my-2 cursor-pointer rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md border border-gray-300 ${
        isSelected
          ? "bg-blue-50 border-blue-400 shadow-md"
          : "hover:bg-gray-50/80 hover:border-gray-400"
      }`}
    >
      <div className="shrink-0">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
            chat.isGroup
              ? "bg-gradient-to-br from-purple-500 to-purple-600"
              : "bg-gradient-to-br from-blue-500 to-cyan-600"
          }`}
        >
          <span className="text-white font-semibold text-lg">
            {getChatAvatar()}
          </span>
        </div>
      </div>

      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {getChatName()}
          </h3>
          {chat.lastMessage && (
            <span className="text-xs text-gray-500 font-medium">
              {formatTime(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 truncate leading-relaxed">
          {getLastMessagePreview()}
        </p>
      </div>
    </div>
  );
};
