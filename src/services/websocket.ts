import { io, Socket } from "socket.io-client";
import type { Message, Chat, User } from "../types";

const WS_URL = import.meta.env.VITE_WS_URL;

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, ((data: unknown) => void)[]> = new Map();

  connect(token: string): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(WS_URL, {
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
      upgrade: true,
      rememberUpgrade: true,
    });

    this.socket.on("messageCreated", (message: Message) => {
      this.emit("messageCreated", message);
    });

    this.socket.on("chatCreated", (chat: Chat) => {
      this.emit("chatCreated", chat);
    });

    this.socket.on("userJoined", (data: { user: User; chatId: string }) => {
      this.emit("userJoined", data);
    });

    this.socket.on("userLeft", (data: { user: User; chatId: string }) => {
      this.emit("userLeft", data);
    });

    this.socket.on("error", (error: Error) => {
      console.error("WebSocket error:", error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
  }

  joinChat(chatId: number): void {
    if (this.socket?.connected) {
      this.socket.emit("joinChat", { chatId });
    }
  }

  leaveChat(chatId: number): void {
    if (this.socket?.connected) {
      this.socket.emit("leaveChat", { chatId });
    }
  }

  sendMessage(chatId: number, content: string): void {
    if (this.socket?.connected) {
      this.socket.emit("sendMessage", {
        chatId,
        content,
        type: "text",
      });
    }
  }

  on<T>(event: string, callback: (data: T) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback as (data: unknown) => void);
  }

  off(event: string, callback?: (data: unknown) => void): void {
    if (!this.listeners.has(event)) {
      return;
    }

    if (callback) {
      const callbacks = this.listeners.get(event)!;
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    } else {
      this.listeners.delete(event);
    }
  }

  public sendTyping(chatId: number): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit("typing", { chatId: chatId });
    }
  }
  private emit<T>(event: string, data: T): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(data);
      });
    }
  }

  get isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getConnectionStatus(): {
    connected: boolean;
    url: string;
    socketId?: string;
    listenersCount: number;
  } {
    return {
      connected: this.socket?.connected || false,
      url: WS_URL,
      socketId: this.socket?.id,
      listenersCount: this.listeners.size,
    };
  }

  getActiveListeners(): string[] {
    return Array.from(this.listeners.keys());
  }
}

export const websocketService = new WebSocketService();
