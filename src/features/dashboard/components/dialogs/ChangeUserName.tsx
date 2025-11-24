import React, {
  startTransition,
  useActionState,
  useContext,
  useState,
} from "react";

import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { AuthContext } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { UpdateUsername } from "../../services/configuration_service";
import { Input } from "@/components/ui/input";

type UpdateUserForm = {
  username: string;
};

type DialogProps = {
  initUserData: User;
};

const ChangeUserName: React.FC<DialogProps> = ({ initUserData }) => {
  const { setAuthenticatedUser } = useContext(AuthContext)!;

  const { register, handleSubmit, reset } = useForm<UpdateUserForm>();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const [_, submitCategoryAction, isPending] = useActionState(
    async (_: void | null, data: UpdateUserForm) => {
      try {
        // recuperar nombre y apellido
        const { username } = data;

        // realizar consulta
        let updateResult = await UpdateUsername(initUserData.id, username);
        if (updateResult) {
          setAuthenticatedUser((prev) => {
            if (!prev) return;

            return {
              ...prev,
              username: username,
              last_name_change: new Date(),
            };
          });
        }

        reset();
      } catch (err) {
        console.error("Error realizar actualizacion:", err);
      } finally {
        toggleDialog();
      }
    },
    undefined
  );

  // Iniciar transaccion de actualizacion
  const startSubmitTransition = (formData: UpdateUserForm) => {
    startTransition(() => {
      submitCategoryAction(formData);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full cursor-pointer active:scale-95"
        >
          <Edit2 size={24} />
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-sm p-6 rounded-4xl shadow-2xl bg-zinc-50">
        <form
          onSubmit={handleSubmit(startSubmitTransition)}
          className="space-y-6"
        >
          <DialogHeader className="mb-4">
            <div className="flex items-start gap-3">
              <div>
                <DialogTitle className="text-lg font-semibold text-zinc-700">
                  Actualizar nombre de usuario
                </DialogTitle>
                <DialogDescription className="text-zinc-600 text-start">
                  Cambia tu nombre de usuario.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Input
            {...register("username", { required: true })}
            className="w-full p-3 border border-zinc-300 rounded-2xl"
            defaultValue={initUserData.username}
          />

          <div className="flex justify-end gap-2">
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full cursor-pointer active:scale-95"
              >
                Cancelar
              </Button>
            </DialogTrigger>

            <Button
              disabled={isPending}
              className="rounded-full cursor-pointer active:scale-95"
            >
              Si, actualizar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserName;
