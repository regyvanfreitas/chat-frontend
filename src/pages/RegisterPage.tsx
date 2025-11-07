import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import { ChatSvg, LightningSvg, LockSvg, UsersSvg } from "../components/Icons";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = (): void => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 md:hidden bg-linear-to-br from-blue-50 via-sky-50 to-cyan-50 px-8 py-12 flex flex-col justify-center min-h-screen">
        <div className="w-full max-w-sm mx-auto space-y-8 my-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
                <ChatSvg className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ChatApp</h1>
            <p className="text-gray-600 text-sm">Junte-se à nossa comunidade</p>
          </div>

          <div className="space-y-6">
            <RegisterForm onSuccess={handleRegisterSuccess} />

            <div className="text-center">
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

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              © 2025 ChatApp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex lg:hidden flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-sky-50 to-cyan-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
                <ChatSvg className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">ChatApp</h2>
            <p className="text-sm text-gray-600">Junte-se à nossa comunidade</p>
          </div>

          <RegisterForm onSuccess={handleRegisterSuccess} />

          <div className="text-center">
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

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              © 2025 ChatApp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-sky-50 to-cyan-50">
        <div className="max-w-md w-full space-y-8">
          <RegisterForm onSuccess={handleRegisterSuccess} />

          <div className="text-center">
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

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              © 2025 ChatApp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-linear-to-br from-sky-400 via-blue-500 to-cyan-600 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center text-white space-y-8">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl mb-6">
              <ChatSvg className="h-10 w-10 text-white" />
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
                <LightningSvg className="h-4 w-4 text-white" />
              </div>
              <span className="text-sky-100">Rápido e fácil</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <LockSvg className="h-4 w-4 text-white" />
              </div>
              <span className="text-sky-100">100% gratuito</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <UsersSvg className="h-4 w-4 text-white" />
              </div>
              <span className="text-sky-100">Comunidade ativa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
