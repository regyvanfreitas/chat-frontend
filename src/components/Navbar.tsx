import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { LogoutModal } from "./LogoutModal";
import { ChatSvg, LogoutSvg } from "./Icons";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = (): void => {
    setShowLogoutModal(true);
    setShowUserMenu(false);
  };

  const handleUserMenuToggle = (): void => {
    setShowUserMenu(!showUserMenu);
  };

  const handleConfirmLogout = (): void => {
    logout();
    setShowLogoutModal(false);
  };

  const handleCancelLogout = (): void => {
    setShowLogoutModal(false);
  };

  return (
    <nav className="bg-linear-to-r from-blue-500 via-blue-400 to-blue-500 shadow-lg border-b border-blue-300/30">
      <div className="max-w-full px-4 sm:px-6">
        <div className="flex justify-between h-16">
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                <ChatSvg className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ChatApp</h1>
                <p className="text-xs text-blue-100">Conectando pessoas</p>
              </div>
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <h1 className="text-lg font-bold text-white">ChatApp</h1>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-3 backdrop-blur-sm px-4 py-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-blue-200">
                <span className="text-blue-600 text-lg font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
              <div>
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
              <LogoutSvg className="mr-2 h-4 w-4" />
              Sair
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <div className="relative" ref={menuRef}>
              <button
                onClick={handleUserMenuToggle}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-blue-200 transition-all duration-200 hover:bg-blue-50 cursor-pointer transform hover:scale-105"
                title="Opções do usuário"
              >
                <span className="text-blue-600 text-lg font-bold leading-none">
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || "Usuário"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "email@exemplo.com"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex items-center"
                  >
                    <LogoutSvg className="mr-3 h-4 w-4" />
                    Sair da conta
                  </button>
                </div>
              )}
            </div>
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
