import React from "react";
import { Skeleton } from "./Skeleton";

export const ChatItemSkeleton: React.FC = () => (
  <div className="flex items-center p-3 mb-1">
    <Skeleton variant="circular" width={48} height={48} />
    <div className="ml-4 flex-1 space-y-2">
      <Skeleton width="60%" height={16} />
      <Skeleton width="80%" height={14} />
    </div>
    <div className="ml-2">
      <Skeleton width={12} height={12} variant="circular" />
    </div>
  </div>
);

export const ChatListSkeleton: React.FC = () => (
  <div className="p-2">
    {Array.from({ length: 6 }).map((_, index) => (
      <ChatItemSkeleton key={index} />
    ))}
  </div>
);

export const MessageSkeleton: React.FC<{ isOwn?: boolean }> = ({
  isOwn = false,
}) => (
  <div className={`flex mb-3 ${isOwn ? "justify-end" : "justify-start"}`}>
    <div className="max-w-xs lg:max-w-md">
      <div
        className={`p-4 rounded-2xl space-y-2 ${
          isOwn ? "bg-gray-200 rounded-br-md" : "bg-gray-100 rounded-bl-md"
        }`}
      >
        <Skeleton width="100%" height={14} />
        <Skeleton width="70%" height={14} />
        <div className="flex justify-end">
          <Skeleton width={40} height={10} />
        </div>
      </div>
    </div>
  </div>
);

export const MessagesListSkeleton: React.FC = () => (
  <div className="p-4 space-y-4">
    <MessageSkeleton isOwn={false} />
    <MessageSkeleton isOwn={true} />
    <MessageSkeleton isOwn={false} />
    <MessageSkeleton isOwn={true} />
    <MessageSkeleton isOwn={false} />
  </div>
);

export const UserItemSkeleton: React.FC = () => (
  <div className="flex items-center p-3 mb-1">
    <Skeleton variant="circular" width={48} height={48} />
    <div className="ml-4 flex-1 space-y-2">
      <Skeleton width="50%" height={14} />
      <Skeleton width="70%" height={12} />
    </div>
  </div>
);

export const UserListSkeleton: React.FC = () => (
  <div className="p-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <UserItemSkeleton key={index} />
    ))}
  </div>
);
