import React, { useState, useEffect } from "react";
import type { User } from "../types";
import { apiService } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { PlusSvg, XSvg, UserSvg, CheckSvg } from "./Icons";

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
      const groupName = isGroup ? chatName.trim() || "Novo Grupo" : undefined;

      await onCreateChat(selectedUsers, groupName);

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white/95 backdrop-blur-sm border border-blue-100/50 w-full max-w-lg shadow-2xl rounded-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <PlusSvg className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Nova Conversa</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <XSvg className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {isGroup && (
              <div>
                <input
                  type="text"
                  placeholder="Nome do grupo (opcional)"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
            )}

            {selectedUsers.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {selectedUsers.length}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-blue-900">
                    {selectedUsers.length} usuário(s) selecionado(s)
                    {isGroup && " - Grupo será criado"}
                  </span>
                </div>
              </div>
            )}

            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-xl bg-gray-50/50">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="text-sm text-gray-500">
                      Carregando usuários...
                    </span>
                  </div>
                </div>
              ) : filteredUsers?.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="h-12 w-12 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <UserSvg className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="font-medium text-gray-900">
                    {searchTerm
                      ? "Nenhum usuário encontrado"
                      : "Nenhum usuário disponível"}
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-gray-500 mt-1">
                      Tente buscar por outro termo
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-2">
                  {filteredUsers?.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleUserSelect(user.id)}
                      className={`flex items-center p-3 cursor-pointer rounded-xl transition-all duration-200 hover:scale-[1.02] mb-1 ${
                        selectedUsers.includes(user.id)
                          ? "bg-blue-100 border border-blue-200 shadow-sm"
                          : "hover:bg-white/80"
                      }`}
                    >
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-semibold text-lg">
                            {user.name?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      {selectedUsers?.includes(user.id) && (
                        <div className="text-blue-500 bg-white rounded-full p-1 shadow-sm">
                          <CheckSvg className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              disabled={isCreating}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateChat}
              disabled={selectedUsers.length === 0 || isCreating}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer shadow-lg"
            >
              {isCreating ? "Criando..." : "Criar Conversa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
