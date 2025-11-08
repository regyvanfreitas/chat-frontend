import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { ChatList } from "../components/ChatList";
import { ChatWindow } from "../components/ChatWindow";
import { NewChatModal } from "../components/NewChatModal";
import { useChats } from "../hooks/useChats";
import { useAuth } from "../hooks/useAuth";
import type { Chat } from "../types";

export const ChatPage: React.FC = () => {
  const { chats, selectedChat, setSelectedChat, createChat, isLoading } =
    useChats();
  const { user } = useAuth();
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showChatView, setShowChatView] = useState(false);

  const handleChatSelect = (chat: Chat): void => {
    setSelectedChat(chat);
    setShowChatView(true);
  };

  const handleBackToList = (): void => {
    setShowChatView(false);
    setSelectedChat(null);
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
      const chatData = {
        participantIds,
        title: isGroup ? chatName : undefined,
      };

      await createChat(chatData);
      setShowNewChatModal(false);
    } catch {
      console.error("Error creating chat:");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-blue-50 via-sky-50 to-cyan-50">
      <Navbar />

      <div className="hidden lg:flex flex-1 overflow-hidden">
        <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-blue-100/50 shadow-lg flex flex-col">
          <div className="p-6 border-b border-gray-100/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-gray-900">Conversas</h2>
              </div>
              <button
                onClick={handleNewChat}
                className="p-3 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
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

        <div className="flex-1 flex flex-col bg-white/95 backdrop-blur-sm border-l border-blue-100/50 shadow-lg overflow-hidden">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6 max-w-md mx-auto px-6">
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 bg-linear-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6">
                    <svg
                      className="h-12 w-12 text-white"
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
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Bem-vindo ao ChatApp!
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {chats?.length === 0
                      ? "Você ainda não tem conversas. Que tal começar uma nova conversa?"
                      : "Selecione uma conversa da lista para começar a conversar ou inicie uma nova."}
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleNewChat}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
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
                </div>

                {chats?.length === 0 && (
                  <div className="pt-8 space-y-4">
                    <div className="flex items-center space-x-3 text-gray-500">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          className="h-3 w-3 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Mensagens em tempo real</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          className="h-3 w-3 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Interface intuitiva</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          className="h-3 w-3 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Comunicação segura</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden flex-1 overflow-hidden">
        {!showChatView ? (
          <div className="h-full bg-white/95 backdrop-blur-sm flex flex-col">
            <div className="p-4 sm:p-6 border-b border-gray-100/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold text-gray-900">Conversas</h2>
                </div>
                <button
                  onClick={handleNewChat}
                  className="p-3 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
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
        ) : (
          <div className="h-full bg-white/95 backdrop-blur-sm flex flex-col">
            {selectedChat && (
              <>
                <div className="p-4 border-b border-gray-100/80 bg-white">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleBackToList}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {selectedChat.isGroup
                            ? (selectedChat.name || "G").charAt(0).toUpperCase()
                            : (
                                selectedChat.participants?.find(
                                  (p) => p.id !== user?.id
                                )?.name || "?"
                              )
                                .charAt(0)
                                .toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedChat.isGroup
                            ? selectedChat.name || "Grupo sem nome"
                            : selectedChat.participants?.find(
                                (p) => p.id !== user?.id
                              )?.name || "Usuário desconhecido"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {selectedChat.isGroup
                            ? `${
                                selectedChat.participants?.length || 0
                              } participantes`
                            : "Chat individual"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <ChatWindow chat={selectedChat} showHeader={false} />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};
