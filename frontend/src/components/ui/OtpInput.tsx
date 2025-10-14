import React, { useRef } from 'react';

interface OtpInputProps {
  length: number;
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}

function OtpInput({ length, value, setValue }: OtpInputProps) {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, ''); // only numbers
    if (!val) return;

    const newValue = [...value];
    newValue[idx] = val[0];
    setValue(newValue);

    // move to next input
    if (idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      const newValue = [...value];
      newValue[idx - 1] = '';
      setValue(newValue);
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          value={value[idx] || ''}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={(el) => (inputsRef.current[idx] = el!)}
          className="h-16 w-16 border rounded-2xl text-center font-neogrotesk-sc-bold text-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      ))}
    </div>
  );
}

export default OtpInput;
