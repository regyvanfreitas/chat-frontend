import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (): void => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-100/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Entrar</h2>
              <p className="mt-2 text-sm text-gray-600">
                Acesse sua conta para continuar
              </p>
            </div>

            <LoginForm onSuccess={handleLoginSuccess} />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  Cadastre-se aqui
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
            <h2 className="text-2xl font-semibold">Bem-vindo de volta!</h2>
            <p className="text-sky-100 text-lg leading-relaxed">
              Conecte-se com seus amigos e colegas em tempo real. Sua plataforma
              de comunicação instantânea favorita.
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sky-100">Mensagens em tempo real</span>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sky-100">Interface intuitiva</span>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sky-100">Seguro e confiável</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
