import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
}

function Input({ type, placeholder }: InputProps) {
  return (
    <input
      type={type}
      className="border border-[#C9C7C7] h-16 w-[550px] rounded-4xl px-10 text-[#6b5a5a] font-neogrotesk-sc-bold"
      placeholder={placeholder}
    />
  );
}

export default Input;