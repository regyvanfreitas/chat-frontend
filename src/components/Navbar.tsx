import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LogoutModal } from "./LogoutModal";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = (): void => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = (): void => {
    logout();
    setShowLogoutModal(false);
  };

  const handleCancelLogout = (): void => {
    setShowLogoutModal(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 shadow-lg border-b border-blue-300/30">
      <div className="max-w-full px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                <h1 className="text-xl font-bold text-white">ChatApp</h1>
                <p className="text-xs text-blue-100">Conectando pessoas</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3  backdrop-blur-sm px-4 py-2 ">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-blue-200">
                <span className="text-blue-600 text-lg font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-white">
                  {user?.name || "Usuário"}
                </div>
                <div className="text-xs text-blue-100">
                  {user?.email || "email@exemplo.com"}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogoutClick}
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium rounded-xl text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer transform hover:scale-105"
              title="Sair da conta"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        userName={user?.name}
      />
    </nav>
  );
};
