import React from "react";
import type { Message } from "../types";
import { useAuth } from "../hooks/useAuth";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { user } = useAuth();

  const isOwnMessage =
    user?.id !== undefined &&
    message.authorId !== undefined &&
    (user.id === message.authorId ||
      user.id.toString() === message.authorId.toString());

  const formatTime = (date: string): string => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isOwnMessage) {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-md">
            <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
              {message?.content}
            </p>
            <div className="text-xs mt-2 text-right text-blue-100 flex items-center justify-end space-x-1">
              <span>{formatTime(message?.createdAt)}</span>
              <svg
                className="w-4 h-4 text-blue-100"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-3">
      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-xs font-semibold text-white">
            {message.author?.name?.charAt(0)?.toUpperCase()}
          </span>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1 px-1 font-medium">
            {message.author?.name}
          </div>
          <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-md">
            <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word text-gray-800">
              {message?.content}
            </p>
            <div className="text-xs mt-2 text-gray-400">
              {formatTime(message?.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
