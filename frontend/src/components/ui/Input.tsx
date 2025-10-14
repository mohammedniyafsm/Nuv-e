interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

function Input({ type, placeholder, value, name, onChange, className = '' }: InputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-[#C9C7C7] rounded-4xl text-[#6b5a5a] font-neogrotesk-bold ${className}`}
    />
  );
}

export default Input;
