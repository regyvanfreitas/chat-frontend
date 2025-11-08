import React, { useEffect, useRef, useState } from "react";
import type { Chat } from "../types";
import { MessageItem } from "./MessageItem";
import { MessageInput } from "./MessageInput";
import { useMessages } from "../hooks/useMessages";
import { useAuth } from "../hooks/useAuth";
import { websocketService } from "../services/websocket";

interface ChatWindowProps {
  chat: Chat;
  showHeader?: boolean; // Prop para controlar se mostra o header
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  showHeader = true,
}) => {
  const { user } = useAuth();
  const { messages, isLoading, sendMessage, retryMessage } = useMessages(
    chat.id,
    user || undefined
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const [otherTypingUserId, setOtherTypingUserId] = useState<number | null>(
    null
  );

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleUserTyping = (data: { chatId: number; userId: number }) => {
      if (data.chatId === chat.id && data.userId !== user?.id) {
        setOtherTypingUserId(data.userId);
        setIsTyping(true);
        if (typingTimeoutRef.current)
          window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = window.setTimeout(() => {
          setIsTyping(false);
          setOtherTypingUserId(null);
        }, 2000);
      }
    };
    websocketService.on("userTyping", handleUserTyping);
    return () => {
      websocketService.off("userTyping");
      if (typingTimeoutRef.current)
        window.clearTimeout(typingTimeoutRef.current);
    };
  }, [chat.id, user?.id]);

  const getTypingUserName = (): string => {
    if (!otherTypingUserId) return "";
    const typingUser = chat.participants.find(
      (p) => p.id === otherTypingUserId
    );
    return typingUser?.name || "Alguém";
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

  const getParticipantsText = (): string => {
    if (chat.isGroup) {
      return `${chat.participants.length} participantes`;
    }
    return "Chat individual";
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

  const groupMessagesByDate = () => {
    const grouped: { [date: string]: typeof messages } = {};

    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const dateKey = messageDate.toDateString();

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });

    return grouped;
  };

  const formatDateSeparator = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoje";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ontem";
    } else {
      return date.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {showHeader && (
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                chat.isGroup
                  ? "bg-linear-to-br from-purple-500 to-purple-600"
                  : "bg-linear-to-br from-blue-500 to-cyan-600"
              }`}
            >
              <span className="text-white font-semibold text-lg">
                {getChatAvatar()}
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                {getChatName()}
              </h2>
              <p className="text-sm text-gray-500">{getParticipantsText()}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 bg-linear-to-b from-gray-50 to-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
              <span className="text-sm text-gray-500">
                Carregando mensagens...
              </span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center space-y-4 max-w-md mx-auto">
              <div className="h-20 w-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <svg
                  className="w-10 h-10 text-blue-500"
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
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Nenhuma mensagem ainda
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Seja o primeiro a enviar uma mensagem para {getChatName()}!
                </p>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-blue-700 font-medium">
                    Digite sua mensagem abaixo
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {Object.entries(groupMessagesByDate())
              .sort(
                ([dateA], [dateB]) =>
                  new Date(dateA).getTime() - new Date(dateB).getTime()
              )
              .map(([dateKey, dateMessages]) => (
                <div key={dateKey}>
                  <div className="flex items-center justify-center my-6">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <div className="px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                      <span className="text-sm font-medium text-gray-600">
                        {formatDateSeparator(dateKey)}
                      </span>
                    </div>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>

                  {dateMessages.map((message) => (
                    <MessageItem
                      key={message.id}
                      message={message}
                      onRetry={retryMessage}
                    />
                  ))}
                </div>
              ))}
            <div ref={messagesEndRef} />
          </>
        )}
        {isTyping && (
          <div className="flex items-center mt-4 mb-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-blue-700 text-sm font-medium">
                {getTypingUserName()} está digitando...
              </span>
            </div>
          </div>
        )}
      </div>

      <MessageInput
        onSendMessage={sendMessage}
        placeholder={
          chat.isGroup
            ? "Enviar mensagem para o grupo..."
            : `Enviar mensagem para ${getChatName()}...`
        }
        onTyping={() => {
          if (user && chat.id) {
            websocketService.sendTyping(chat.id);
          }
        }}
      />
    </div>
  );
};
