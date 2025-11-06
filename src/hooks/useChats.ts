import { useState, useEffect } from "react";
import type { Chat, CreateChatRequest } from "../types";
import { apiService } from "../services/api";
import { websocketService } from "../services/websocket";

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChats();
  }, [selectedChat?.id]);

  const fetchChats = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const chatsList = await apiService.getChats();
      setChats(Array.isArray(chatsList) ? chatsList : []);
    } catch (error) {
      console.error("Error fetching chats:", error);
      alert("Erro ao carregar chats");
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createChat = async (request: CreateChatRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const newChat = await apiService.createChat(request);
      setChats((prevChats) => {
        const currentChats = Array.isArray(prevChats) ? prevChats : [];
        return [...currentChats, newChat];
      });
      setSelectedChat(newChat);
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Erro ao criar chat");
      throw error;
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
