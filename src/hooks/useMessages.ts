import { useState, useEffect } from "react";
import type { Message } from "../types";
import { apiService } from "../services/api";
import { websocketService } from "../services/websocket";

export const useMessages = (chatId: number | null) => {
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
      } catch (error) {
        console.error("Error fetching messages:", error);
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
          return [...prevMessages, newMessage];
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

    try {
      setIsSending(true);

      websocketService.sendMessage(chatId, content.trim());
    } catch (error) {
      alert("Erro ao enviar mensagem");
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
    } catch (error) {
      console.error("Error refetching messages:", error);
      alert("Erro ao carregar mensagens");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    sendMessageViaWebSocket,
    refetch: refetchMessages,
  };
};
