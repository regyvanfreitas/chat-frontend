import React, { useState, useEffect } from "react";
import type { User } from "../types";
import { apiService } from "../services/api";
import { useAuth } from "../hooks/useAuth";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (participantIds: number[], chatName?: string) => Promise<void>;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  onCreateChat,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [chatName, setChatName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const fetchUsers = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const usersList = await apiService.getUsers();
      const filteredUsers = usersList?.filter((u) => u.id !== currentUser?.id);
      console.log(usersList);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Erro ao carregar usuários");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (userId: number): void => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleCreateChat = async (): Promise<void> => {
    if (selectedUsers.length === 0) {
      alert("Selecione pelo menos um usuário");
      return;
    }

    try {
      setIsCreating(true);
      const isGroup = selectedUsers.length > 1;
      await onCreateChat(
        selectedUsers,
        isGroup ? chatName || "Novo Grupo" : undefined
      );

      setSelectedUsers([]);
      setChatName("");
      setSearchTerm("");
      onClose();
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Erro ao criar conversa");
    } finally {
      setIsCreating(false);
    }
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const isGroup = selectedUsers.length > 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Nova Conversa</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chat-primary focus:border-transparent"
            />
          </div>

          {isGroup && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nome do grupo (opcional)"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chat-primary focus:border-transparent"
              />
            </div>
          )}

          {selectedUsers.length > 0 && (
            <div className="mb-3 text-sm text-gray-600">
              {selectedUsers.length} usuário(s) selecionado(s)
              {isGroup && " - Grupo será criado"}
            </div>
          )}

          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-chat-primary"></div>
              </div>
            ) : filteredUsers?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm
                  ? "Nenhum usuário encontrado"
                  : "Nenhum usuário disponível"}
              </div>
            ) : (
              filteredUsers?.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user.id)}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                    selectedUsers.includes(user.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  {selectedUsers?.includes(user.id) && (
                    <div className="text-chat-primary">
                      <svg
                        className="w-5 h-5"
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
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={onClose}
              disabled={isCreating}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateChat}
              disabled={selectedUsers.length === 0 || isCreating}
              className="px-4 py-2 bg-chat-primary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Criando..." : "Criar Conversa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
