import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType } from "../types";
import { apiService } from "../services/api";
import { websocketService } from "../services/websocket";
import { decodeJWT } from "../utils/helpers";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("chat-token");
    const savedUser = localStorage.getItem("chat-user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
        websocketService.connect(savedToken);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("chat-token");
        localStorage.removeItem("chat-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const authResponse = await apiService.loginUser({ email, password });

      const authToken = authResponse.access_token;

      const decodedToken = decodeJWT(authToken);
      if (!decodedToken) {
        throw new Error("Token inválido");
      }

      const loggedUser: User = {
        id: parseInt(decodedToken.sub as string, 10),
        email: decodedToken.email as string,
        name: decodedToken.name as string,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("chat-token", authToken);
      localStorage.setItem("chat-user", JSON.stringify(loggedUser));

      setToken(authToken);
      setUser(loggedUser);

      websocketService.connect(authToken);
      console.log("WebSocket connection initiated with token");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      setIsLoading(true);
      await apiService.registerUser({
        name,
        email,
        password,
      });

      await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("chat-token");
    localStorage.removeItem("chat-user");

    setToken(null);
    setUser(null);

    websocketService.disconnect();
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
