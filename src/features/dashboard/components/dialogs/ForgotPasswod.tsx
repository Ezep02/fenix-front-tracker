import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";


import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { User } from "@/types/user";


import { UpdateUserPassword } from "../../services/configuration_service";
import InputPassword from "@/features/auth/components/inputs/InputPassword";
import { LoginFormData } from "@/features/auth/types/login/loginFormTypes";

type DialogProps = {
  userInfo?: User;
};

const ForgotPassword: React.FC<DialogProps> = ({ userInfo }) => {
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      password: "",
    },
  });

  const [submitErr, sendEmailAction, isPending] = useActionState(
    async (_state: void | undefined, payload: unknown) => {
    
      
      if (!userInfo?.id){
        throw Error("no fue posible recuperar el id del cliente")
      }
      
      const newPassword = payload as string;
      try {
        await UpdateUserPassword(userInfo?.id, newPassword);
        setOpen(false);

      } catch (err: any) {
        setShowError(true);
        return err?.response?.data?.error || "Error restableciendo contraseña";
      }
    },
    undefined
  );

  const onSubmit = (data:LoginFormData ) => {
    const finalEmail = data.password;

    if (!finalEmail) {
      alert("Por favor ingresa un email válido.");
      return;
    }

    startTransition(() => {
      sendEmailAction(finalEmail);
    });
  };

  // ocultar mensaje de error
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="rounded-full active:scale-95 cursor-pointer"
        >
          Olvide mi contraseña
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-sm p-6 rounded-4xl shadow-2xl bg-zinc-50">
        <form>
          <DialogHeader className="mb-4">
            <div className="flex items-start gap-3">
              <div>
                <DialogTitle className="text-lg font-semibold text-zinc-700">
                  Restablecer contraseña
                </DialogTitle>
                <DialogDescription className="text-zinc-600 text-start">
                  Se actualizara la contraseña asociada a {userInfo?.email}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Input solo si no viene el email */}
          <InputPassword
            name="password"
            register={register}
            error={errors.password}
            placeholder="Ingrese contraseña"
            valueAsNumber={false}
            type="password"
          />

          {/* Mensaje de error que desaparece */}
          {showError && submitErr && (
            <div className="flex bg-red-500 mt-2 p-2 rounded-md">
              <span className="text-sm font-medium text-zinc-50">
                {submitErr}
              </span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="rounded-full"
            >
              {isPending ? "Enviando..." : "Sí, restablecer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
