import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { ChatList } from "../components/ChatList";
import { ChatWindow } from "../components/ChatWindow";
import { NewChatModal } from "../components/NewChatModal";
import { useChats } from "../hooks/useChats";
import type { Chat } from "../types";

export const ChatPage: React.FC = () => {
  const { chats, selectedChat, setSelectedChat, createChat, isLoading } =
    useChats();
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleChatSelect = (chat: Chat): void => {
    setSelectedChat(chat);
  };

  const handleNewChat = (): void => {
    setShowNewChatModal(true);
  };

  const handleCreateChat = async (
    participantIds: number[],
    chatName?: string
  ): Promise<void> => {
    try {
      const isGroup = participantIds.length > 1;
      await createChat({
        participantIds,
        isGroup,
        name: isGroup ? chatName : undefined,
      });
      setShowNewChatModal(false);
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Conversas</h2>
              <button
                onClick={handleNewChat}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Nova conversa"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>

          <ChatList
            chats={chats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            isLoading={isLoading}
          />
        </div>

        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <svg
                  className="mx-auto h-24 w-24 text-gray-300"
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
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Selecione uma conversa
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Escolha uma conversa da lista ao lado para começar a conversar
                </p>
                {chats?.length === 0 && (
                  <button
                    onClick={handleNewChat}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Iniciar nova conversa
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};
