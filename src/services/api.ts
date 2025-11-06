import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  AuthResponse,
  RegisterResponse,
  LoginRequest,
  RegisterRequest,
  Chat,
  Message,
  CreateChatRequest,
  SendMessageRequest,
  User,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("chat-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("chat-token");
          localStorage.removeItem("chat-user");
        }
        return Promise.reject(error);
      }
    );
  }

  async loginUser(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error("Network error");
    }
  }

  async registerUser(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await this.api.post<RegisterResponse>(
        "/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Registration failed");
      }
      throw new Error("Network error");
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await this.api.get<User[]>("/users");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to fetch users");
      }
      throw new Error("Network error");
    }
  }

  async getChats(): Promise<Chat[]> {
    try {
      const response = await this.api.get<Chat[]>("/chats");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to fetch chats");
      }
      throw new Error("Network error");
    }
  }

  async createChat(chatData: CreateChatRequest): Promise<Chat> {
    try {
      const response = await this.api.post<Chat>("/chats", chatData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to create chat");
      }
      throw new Error("Network error");
    }
  }

  async getMessages(chatId: number): Promise<Message[]> {
    try {
      const response = await this.api.get<Message[]>(
        `/chats/${chatId}/messages`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch messages"
        );
      }
      throw new Error("Network error");
    }
  }

  async sendMessage(
    chatId: number,
    messageData: SendMessageRequest
  ): Promise<Message> {
    try {
      const response = await this.api.post<Message>(
        `/chats/${chatId}/messages`,
        messageData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to send message"
        );
      }
      throw new Error("Network error");
    }
  }
}

export const apiService = new ApiService();
