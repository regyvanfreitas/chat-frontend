import React, { useEffect, useRef, useState } from "react";
import type { Chat } from "../types";
import { MessageItem } from "./MessageItem";
import { MessageInput } from "./MessageInput";
import { useMessages } from "../hooks/useMessages";
import { useAuth } from "../hooks/useAuth";
import { websocketService } from "../services/websocket";

interface ChatWindowProps {
  chat: Chat;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const { messages, isLoading, sendMessage } = useMessages(chat.id);
  const { user } = useAuth();
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

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium">{getChatAvatar()}</span>
          </div>
          <div className="ml-3 flex-1">
            <h2 className="text-lg font-medium text-gray-900">
              {getChatName()}
            </h2>
            <p className="text-sm text-gray-500">{getParticipantsText()}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-linear-to-b from-gray-50 to-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chat-primary"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              className="w-16 h-16 mb-4"
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
            <p className="text-lg">Nenhuma mensagem ainda</p>
            <p className="text-sm mt-1">
              Seja o primeiro a enviar uma mensagem!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}

        {isTyping && (
          <div className="flex items-center mt-2">
            <span className="animate-pulse text-blue-500 text-sm font-medium">
              {getTypingUserName()} está digitando...
            </span>
          </div>
        )}
      </div>

      <MessageInput
        onSendMessage={sendMessage}
        placeholder={`Enviar mensagem para ${getChatName()}...`}
        onTyping={() => {
          if (user && chat.id) {
            websocketService.sendTyping(chat.id);
          }
        }}
      />
    </div>
  );
};
