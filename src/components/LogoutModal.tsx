import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white/95 backdrop-blur-sm border border-blue-100/50 w-full max-w-md shadow-2xl rounded-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="h-5 w-5 text-white"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Confirmar Saída
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 cursor-pointer"
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

          <div className="space-y-4 mb-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-blue-500"
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
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Tem certeza que deseja sair?
              </p>
              {userName && (
                <p className="text-sm text-gray-600">
                  Você será desconectado como{" "}
                  <span className="font-medium">{userName}</span>
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Suas conversas serão mantidas e você pode fazer login novamente
                a qualquer momento.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
