# Chat Frontend - Aplicativo de Chat em Tempo Real

Frontend completo de um aplicativo de chat entre usuários construído com React + Vite + TypeScript + Tailwind CSS.

## 🌐 Acesso à Aplicação

<a href="https://chat-app-rf.vercel.app/" target="_blank" rel="noopener noreferrer">Acesse a aplicação em produção</a>

> Interface de chat em tempo real totalmente responsiva e otimizada.

## 🚀 Funcionalidades Implementadas

- ✅ **Autenticação JWT** - Login e Registro com token JWT
- ✅ **Interface Responsiva** - Layout moderno com Tailwind CSS
- ✅ **Chat em Tempo Real** - WebSocket para mensagens instantâneas
- ✅ **Lista de Conversas** - Sidebar com lista de chats
- ✅ **Histórico de Mensagens** - Carregamento e exibição de mensagens
- ✅ **Diferenciação Visual** - Mensagens próprias vs outros usuários
- ✅ **Sistema de Logout** - Logout seguro com limpeza de dados
- ✅ **Proteção de Rotas** - Acesso restrito a usuários autenticados

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e servidor de desenvolvimento rápido
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP para API
- **Socket.io Client** - WebSocket para comunicação em tempo real

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Navbar.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ChatList.tsx
│   ├── ChatItem.tsx
│   ├── ChatWindow.tsx
│   ├── MessageItem.tsx
│   ├── MessageInput.tsx
│   └── ProtectedRoute.tsx
├── pages/               # Páginas principais
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── ChatPage.tsx
├── context/             # Contextos React
│   └── AuthContext.tsx
├── hooks/               # Hooks customizados
│   ├── useAuth.ts
│   ├── useChats.ts
│   └── useMessages.ts
├── services/            # Serviços externos
│   ├── api.ts
│   └── websocket.ts
├── types/               # Definições TypeScript
│   └── index.ts
└── utils/               # Funções utilitárias
    └── helpers.ts
```

## ⚙️ Configuração e Instalação

1. **Clone o repositório**

   ```bash
   git clone <repository-url>
   cd chat-frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Edite `.env` com as URLs do backend:

   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_WS_URL=http://localhost:3000
   ```

4. **Execute o projeto**

   ```bash
   npm run dev
   ```

   Acesse: `http://localhost:5173`

## 📋 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Verificação de código

## 🔗 Endpoints da API

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário

### Chats

- `GET /api/chats` - Lista de chats
- `POST /api/chats` - Criar novo chat

### Mensagens

- `GET /api/chats/:id/messages` - Mensagens do chat
- `POST /api/chats/:id/messages` - Enviar mensagem

## 🔌 Eventos WebSocket

### Escutados pelo Frontend:

- `messageCreated` - Nova mensagem recebida
- `chatCreated` - Novo chat criado
- `userJoined` - Usuário entrou no chat
- `userLeft` - Usuário saiu do chat

### Emitidos pelo Frontend:

- `joinChat` - Entrar em chat
- `leaveChat` - Sair do chat
- `sendMessage` - Enviar mensagem

## 🎯 Funcionalidades Detalhadas

### Sistema de Autenticação

- Login/registro com validação
- JWT armazenado no localStorage
- Auto-logout em caso de token expirado
- Redirecionamento automático

### Interface de Chat

- Lista de conversas com última mensagem
- Seleção de chat ativo
- Mensagens em tempo real
- Scroll automático para novas mensagens
- Design responsivo e moderno

### Gerenciamento de Estado

- Context API para autenticação
- Hooks customizados para chats e mensagens
- Estado sincronizado com WebSocket

## 🚀 Deploy e Produção

### Aplicação em Produção

- **URL**: [https://sua-url-de-producao.com](https://sua-url-de-producao.com)
- **Status**: ✅ Online
- **Última atualização**: Novembro 2025

### Configuração de Deploy

Para deploy em produção, certifique-se de:

1. **Configurar variáveis de ambiente de produção**:

   ```env
   VITE_API_URL=https://sua-api-producao.com
   VITE_WS_URL=https://sua-api-producao.com
   VITE_NODE_ENV=production
   ```

2. **Build da aplicação**:

   ```bash
   npm run build
   ```

3. **Servir arquivos estáticos**:
   - Deploy da pasta `dist/` no seu provedor
   - Configurar redirecionamentos SPA para `index.html`

### Provedores Recomendados

- **Vercel** - Deploy automático via Git
- **Netlify** - Build e deploy contínuo
- **GitHub Pages** - Hosting gratuito
- **AWS S3 + CloudFront** - Solução escalável
