import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = (): void => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-100/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Criar Conta</h2>
              <p className="mt-2 text-sm text-gray-600">
                Junte-se à nossa comunidade
              </p>
            </div>

            <RegisterForm onSuccess={handleRegisterSuccess} />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              © 2025 ChatApp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-600 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center text-white space-y-8">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl mb-6">
              <svg
                className="h-10 w-10 text-white"
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
            <h1 className="text-4xl font-bold mb-4">ChatApp</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Junte-se à Comunidade!</h2>
            <p className="text-sky-100 text-lg leading-relaxed">
              Crie sua conta e comece a se conectar com pessoas incríveis. Sua
              jornada de comunicação começa aqui.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-sky-100">Rápido e fácil</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span className="text-sky-100">100% gratuito</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-sky-100">Comunidade ativa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
