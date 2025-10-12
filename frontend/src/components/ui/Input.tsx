import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  className?: string; 
}

function Input({ type, placeholder, className = '' }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border border-[#C9C7C7] h-16 rounded-4xl px-10 text-[#6b5a5a] font-neogrotesk-sc-bold ${className}`}
    />
  );
}

export default Input;