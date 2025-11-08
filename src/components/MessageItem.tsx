import React from "react";
import type { Message } from "../types";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinnerSvg, ErrorSvg, CheckSvg } from "./Icons";

interface MessageItemProps {
  message: Message;
  onRetry?: (message: Message) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onRetry,
}) => {
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
    const isBeingSent = message.status === "sending";
    const hasFailed = message.status === "failed";

    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-xs lg:max-w-md">
          <div
            className={`text-white px-4 py-3 rounded-2xl rounded-br-md shadow-md transition-all duration-200 ${
              hasFailed
                ? "bg-red-500"
                : isBeingSent
                ? "bg-blue-400 opacity-75"
                : "bg-blue-500"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
              {message?.content}
            </p>
            <div className="text-xs mt-2 text-right text-blue-100 flex items-center justify-end space-x-1">
              <span>{formatTime(message?.createdAt)}</span>
              {message.status === "sending" ? (
                <LoadingSpinnerSvg className="w-4 h-4 text-blue-200 animate-spin" />
              ) : message.status === "failed" ? (
                <button
                  onClick={() => onRetry?.(message)}
                  className="hover:scale-110 transition-transform"
                  title="Tentar novamente"
                >
                  <ErrorSvg className="w-4 h-4 text-red-300 hover:text-red-200" />
                </button>
              ) : (
                <CheckSvg className="w-4 h-4 text-blue-100" />
              )}
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
