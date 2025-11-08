import { useState, useEffect } from "react";
import type { Message, User } from "../types";
import { apiService } from "../services/api";
import { websocketService } from "../services/websocket";

export const useMessages = (chatId: number | null, currentUser?: User) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const messagesList = await apiService.getMessages(chatId);
        setMessages(messagesList);
      } catch {
        alert("Erro ao carregar mensagens");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    const handleMessageCreated = (newMessage: Message) => {
      if (newMessage.chatId === chatId) {
        setMessages((prevMessages) => {
          const exists = prevMessages.some((msg) => msg.id === newMessage.id);
          if (exists) {
            return prevMessages;
          }

          const filteredMessages = prevMessages.filter(
            (msg) => !(msg.isOptimistic && msg.content === newMessage.content)
          );

          return [...filteredMessages, newMessage];
        });
      }
    };

    websocketService.on<Message>("messageCreated", handleMessageCreated);

    return () => {
      websocketService.off("messageCreated");
    };
  }, [chatId]);

  const sendMessage = async (content: string): Promise<void> => {
    if (!chatId || !content.trim()) return;

    const tempId = Date.now() * -1;
    const tempMessage: Message = {
      id: tempId,
      content: content.trim(),
      authorId: currentUser?.id || 0,
      author: currentUser || { id: 0, name: "Você", email: "", createdAt: "" },
      chatId,
      createdAt: new Date().toISOString(),
      status: "sending",
      isOptimistic: true,
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      setIsSending(true);

      websocketService.sendMessage(chatId, content.trim());

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === tempId ? { ...msg, status: "sent" } : msg
          )
        );
      }, 500);
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  const sendMessageViaWebSocket = (content: string): void => {
    if (!chatId || !content.trim()) return;
    websocketService.sendMessage(chatId, content.trim());
  };

  const refetchMessages = async (): Promise<void> => {
    if (!chatId) return;

    try {
      setIsLoading(true);
      const messagesList = await apiService.getMessages(chatId);
      setMessages(messagesList);
    } catch {
      alert("Erro ao carregar mensagens");
    } finally {
      setIsLoading(false);
    }
  };

  const retryMessage = async (failedMessage: Message): Promise<void> => {
    if (!failedMessage.isOptimistic) return;

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === failedMessage.id ? { ...msg, status: "sending" } : msg
      )
    );

    try {
      setIsSending(true);
      websocketService.sendMessage(failedMessage.chatId, failedMessage.content);

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === failedMessage.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 500);
    } catch {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === failedMessage.id ? { ...msg, status: "failed" } : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    sendMessageViaWebSocket,
    retryMessage,
    refetch: refetchMessages,
  };
};
