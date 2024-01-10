import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface SelectProps {
  id: string;
  label: string;
  options: { id: string; title: string }[];
  disabled?: boolean;
  register: UseFormRegister<FieldValues>; // UseFormRegister type
  required?: boolean;
  errors: FieldErrors;
}

const Select: React.FC<SelectProps> = ({ id, label, options, disabled, register, required, errors }) => {
  const selectRef = React.useRef<HTMLSelectElement | null>(null);

  // Register the ref using the ref prop
  // React.useEffect(() => {
  //   register(id, { required });
  // }, [id, register, required]);

  return (
    <div className="w-full relative">
      <select
        id={id}
        name={id}
        ref={selectRef}
        disabled={disabled}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          pl-4
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      >
      <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
         <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
        {/*  option à la fin */}
        <option value="">-- Aucun --</option>
      </select>
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          left-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-rose-500 text-sm mt-1">{label} est requis</span>
      )}
    </div>
  );
};

export default Select;
