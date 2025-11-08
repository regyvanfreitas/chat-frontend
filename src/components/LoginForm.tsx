import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  EmailSvg,
  LockSvg,
  EyeSvg,
  EyeOffSvg,
  AlertCircleSvg,
  LoadingSvg,
} from "./Icons";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email e senha são obrigatórios");
      return;
    }

    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-900"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EmailSvg className="h-5 w-5 text-blue-500" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-all duration-200"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-900"
        >
          Senha
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockSvg className="h-5 w-5 text-blue-500" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50 transition-all duration-200"
            placeholder="Digite sua senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <EyeOffSvg className="h-5 w-5 text-blue-500 hover:text-blue-700 transition-colors" />
            ) : (
              <EyeSvg className="h-5 w-5 text-blue-500 hover:text-blue-700 transition-colors" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 animate-in slide-in-from-top-1 duration-200">
          <div className="flex items-center">
            <AlertCircleSvg className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          {isLoading ? (
            <>
              <LoadingSvg className="-ml-1 mr-3 h-5 w-5 text-white" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>
      </div>

      {/* <div className="text-center">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
        >
          Esqueceu sua senha?
        </button>
      </div> */}
    </form>
  );
};
