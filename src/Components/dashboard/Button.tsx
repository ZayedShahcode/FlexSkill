import React from "react";

interface ButtonProps {
  onHandleClick: () => void;
  btncolor?: string; // Optional with a default value
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onHandleClick, btncolor, children }) => {
  return (
    <button
      className={`bg-${btncolor}-800 w-16 h-8 text-white font-semibold rounded-lg`}
      onClick={onHandleClick}
    >
      {children}
    </button>
  );
};
