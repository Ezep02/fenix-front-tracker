import React, { useContext, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormData } from "../types/login/loginFormTypes";
import InputPassword from "./inputs/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../types/login/zodResolver";
import InputEmail from "./inputs/InputEmail";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "@/context/AuthContext";
import { Login } from "../services/auth_services";

const LoginForm: React.FC = () => {
  const { setAuthenticatedUser } = useContext(AuthContext)!;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      remember_me: true,
    },
  });

  const [loginErr, setLoginErr] = useState<string>("");

  const onSubmit = async (data: LoginFormData) => {
    try {
      let res = await Login(data);
      if (res) {
        setAuthenticatedUser(res.user);
        window.location.href = "/"
      }
    } catch (error: any) {
      setLoginErr(error?.response?.data?.error || "Usuario o contraseña incorrectos");
    }
  };

  // Borra automaticamente el error después de 3 segundos
  useEffect(() => {
    if (loginErr) {
      const timer = setTimeout(() => {
        setLoginErr("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginErr]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Overlay Loader */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white backdrop-blur-md z-50"
            role="status"
            aria-live="polite"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <Loader2 size={40} className="animate-spin text-purple-600" />
              <p className="mt-4 text-gray-800 font-medium text-lg">
                Verificando información...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
          <Lock className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-semibold text-gray-900">Fenix</span>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Buenas,
          <br />
          Bienvenido de regreso
        </h1>
        <p className="text-gray-600">Hey, ¿estás listo para una nueva sesión?</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <InputEmail
          name="email"
          register={register}
          error={errors.email}
          placeholder="fenix@gmail.com"
          type="email"
        />

        {/* Password */}
        <InputPassword
          name="password"
          register={register}
          error={errors.password}
          placeholder="Ingrese contraseña"
          valueAsNumber={false}
          type="password"
        />

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Controller
              name="remember_me"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="remember_me"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
              )}
            />
            <label
              htmlFor="remember_me"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Recordarme
            </label>
          </div>

          <button
            type="button"
            className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
          >
            ¿Olvidaste la contraseña?
          </button>
        </div>

        {/* Error minimalista */}
        <AnimatePresence>
          {loginErr && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 p-2 bg-red-100 border border-red-300 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-600">{loginErr}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full active:scale-[1.01] flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 size={18} className="animate-spin" />}
          {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
