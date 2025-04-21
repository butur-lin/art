import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button className={`px-4 py-2 rounded-xl font-medium bg-black text-white hover:bg-gray-800 transition ${className}`} {...props}>
    {children}
  </button>
);
