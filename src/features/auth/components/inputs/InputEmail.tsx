import { Input } from "@/components/ui/input";
import React from "react";
import { LoginFieldProps } from "../../types/login/loginFormTypes";

const InputEmail:React.FC<LoginFieldProps> = ({
    name,
    register,
    error,
    placeholder,
    type,
}) => {
    
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        className="h-12 px-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
        {...register(name, {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Ingrese un email válido",
          },
        })}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputEmail;
