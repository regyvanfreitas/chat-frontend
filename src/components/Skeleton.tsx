import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "text",
  width,
  height,
  animation = "pulse",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "circular":
        return "rounded-full";
      case "rectangular":
        return "rounded-lg";
      case "text":
      default:
        return "rounded";
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case "wave":
        return "animate-wave";
      case "none":
        return "";
      case "pulse":
      default:
        return "animate-pulse";
    }
  };

  const getDefaultSize = () => {
    switch (variant) {
      case "circular":
        return { width: "40px", height: "40px" };
      case "rectangular":
        return { width: "100%", height: "20px" };
      case "text":
      default:
        return { width: "100%", height: "1em" };
    }
  };

  const defaultSize = getDefaultSize();
  const style = {
    width: width || defaultSize.width,
    height: height || defaultSize.height,
  };

  return (
    <div
      className={`bg-gray-200 ${getVariantClasses()} ${getAnimationClasses()} ${className}`}
      style={style}
    />
  );
};
