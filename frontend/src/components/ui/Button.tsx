
interface ButtonProps {
  name: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Button({ name, className = "", onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-4xl flex justify-center items-center 
                  font-neogroteskessalt-light text-white 
                  bg-[#3B3B3B] px-6 py-3 
                  transition-all duration-300 
                  hover:bg-[#2b2b2b] active:scale-95 ${className}`}
    >
      {name}
    </button>
  );
}

export default Button;
