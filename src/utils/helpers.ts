/**
 * Formata uma data para exibição amigável
 */
export const formatDate = (date: string | Date): string => {
  const messageDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - messageDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Hoje";
  } else if (diffDays === 2) {
    return "Ontem";
  } else if (diffDays <= 7) {
    return messageDate.toLocaleDateString("pt-BR", { weekday: "long" });
  } else {
    return messageDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
};

/**
 * Decodifica um JWT token e retorna o payload
 */
export const decodeJWT = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token JWT inválido');
    }
    
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload) as Record<string, unknown>;
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
};

/**
 * Formata um horário para exibição
 */
export const formatTime = (date: string | Date): string => {
  const messageDate = new Date(date);
  return messageDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formata data e hora completa
 */
export const formatDateTime = (date: string | Date): string => {
  const messageDate = new Date(date);
  const now = new Date();
  const isToday = messageDate.toDateString() === now.toDateString();

  if (isToday) {
    return `Hoje às ${formatTime(date)}`;
  } else {
    return `${formatDate(date)} às ${formatTime(date)}`;
  }
};

/**
 * Trunca texto com ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Valida se é um email válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Gera uma cor de avatar baseada no nome
 */
export const getAvatarColor = (name: string): string => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

/**
 * Obtém as iniciais de um nome
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

/**
 * Debounce function para otimizar searches
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Classe utilitária para gerenciar combinações de classes CSS
 */
export const clsx = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Verifica se uma string está vazia ou só contém espaços
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Capitaliza a primeira letra de uma string
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Gera um ID único simples
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
