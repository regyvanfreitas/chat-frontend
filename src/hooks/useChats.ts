import { useState, useEffect } from "react";
import type { Chat, CreateChatRequest, Message } from "../types";
import { apiService } from "../services/api";
import { websocketService } from "../services/websocket";

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const handleMessageCreated = (newMessage: Message) => {
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          if (chat.id === newMessage.chatId) {
            return {
              ...chat,
              lastMessage: newMessage,
              unreadCount:
                chat.id === selectedChat?.id ? 0 : (chat.unreadCount || 0) + 1,
            };
          }
          return chat;
        });
      });
    };

    websocketService.on<Message>("messageCreated", handleMessageCreated);

    return () => {
      websocketService.off("messageCreated");
    };
  }, [selectedChat?.id]);

  const fetchChats = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const chatsList = await apiService.getChats();
      setChats(Array.isArray(chatsList) ? chatsList : []);
    } catch {
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createChat = async (request: CreateChatRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const newChat = await apiService.createChat(request);

      await fetchChats();

      const updatedChats = await apiService.getChats();
      const createdChat = updatedChats.find((chat) => chat.id === newChat.id);

      if (createdChat) {
        setSelectedChat(createdChat);
      } else {
        setSelectedChat(newChat);
      }
    } catch {
      alert("Erro ao criar chat");
    } finally {
      setIsLoading(false);
    }
  };

  const selectChat = (chat: Chat | null): void => {
    if (selectedChat) {
      websocketService.leaveChat(selectedChat.id);
    }

    setSelectedChat(chat);

    if (chat) {
      setChats((prevChats) =>
        prevChats.map((c) => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
      );
      websocketService.joinChat(chat.id);
    }
  };

  return {
    chats,
    selectedChat,
    setSelectedChat: selectChat,
    createChat,
    isLoading,
    refetch: fetchChats,
  };
};
