import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoginFieldProps } from "../../types/login/loginFormTypes";
import { Eye, EyeOff } from "lucide-react";


const InputPassword:React.FC<LoginFieldProps> = ({
  error,
  name,
  placeholder,
  register,
  valueAsNumber
}) => {
 const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="h-12 px-4 pr-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
        {...register(name, {
          valueAsNumber,
          required: "La contraseña es obligatoria",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        })}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputPassword