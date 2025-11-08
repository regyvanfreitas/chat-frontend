export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  isOnline?: boolean;
}

export interface Chat {
  id: number;
  name: string;
  isGroup: boolean;
  participants: User[];
  lastMessage?: Message;
  unreadCount?: number;
  isTyping?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  content: string;
  authorId: number;
  author: User;
  chatId: number;
  type?: "text" | "image" | "file";
  createdAt: string;
  updatedAt?: string;
  status?: "sending" | "sent" | "failed";
  isOptimistic?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AuthResponse {
  access_token: string;
  name: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateChatRequest {
  title?: string;
  participantIds: number[];
}

export interface SendMessageRequest {
  content: string;
  type?: "text" | "image" | "file";
}

export interface WebSocketMessage {
  type: "messageCreated" | "chatCreated" | "userJoined" | "userLeft";
  data: Message | Chat | User | Record<string, unknown>;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface ChatContextType {
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  createChat: (request: CreateChatRequest) => Promise<void>;
  isLoading: boolean;
}
