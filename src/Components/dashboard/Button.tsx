import React from "react";

interface ButtonProps {
  onHandleClick: () => void;
  btncolor?: "red" | "blue" | "green" | "gray"; // Restricting to valid Tailwind colors
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onHandleClick, btncolor = "gray", children }) => {
  const colorClasses: Record<string, string> = {
    red: "bg-red-800",
    blue: "bg-blue-800",
    green: "bg-green-800",
    gray: "bg-gray-800", // Default color
  };

  return (
    <button
      className={`${colorClasses[btncolor]} w-16 h-8 text-white font-semibold rounded-lg`}
      onClick={onHandleClick}
    >
      {children}
    </button>
  );
};
