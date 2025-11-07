import React, { useState } from "react";
import type { KeyboardEvent } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  onTyping?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Digite sua mensagem...",
  onTyping,
}) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await sendMessage();
  };

  const handleKeyPress = async (
    e: KeyboardEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    if (onTyping) onTyping();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  };

  const sendMessage = async (): Promise<void> => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending || disabled) return;

    try {
      setIsSending(true);
      await onSendMessage(trimmedMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border-t border-gray-200"
    >
      <div className="flex space-x-2">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (onTyping) onTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled || isSending}
            rows={1}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: "40px",
              maxHeight: "120px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 120) + "px";
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim() || isSending || disabled}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 h-10 disabled:cursor-not-allowed text-white rounded-lg p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          {isSending ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};
