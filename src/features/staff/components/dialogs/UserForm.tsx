import React, { startTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
// import useCategoriesAction from "../../hooks/useCategoriesAction";
import { Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
import useUsersActions from "../../hooks/useUsersActions";
import { Switch } from "@/components/ui/switch";

type Props = {
  user?: User;
  trigger?: React.ReactNode;
};

const UserForm: React.FC<Props> = ({ user, trigger }) => {
  // HOOKS

  const { register, handleSubmit, watch, setValue } = useForm<User>({
    defaultValues: {
      id: user?.id,
      name: user?.name || "",
      email: user?.email,
      surname: user?.surname,
      username: user?.username,
      is_active: user?.is_active,
    },
  });

  const isActive = watch("is_active");

  const {
    createUserErr,
    isCreateUserPending,
    onCreateUserAction,
    isFormOpen,
    toggleFormStatus,
    onUpdateUserAction,
    isUpdateUserPending,
    updateUserErr,
  } = useUsersActions();

  // Submit event
  const handleSubmitForm = async (data: User) => {
    startTransition(async () => {
      switch (user) {
        case undefined:
          onCreateUserAction(data);
          break;
        default:
          onUpdateUserAction(data);
      }
    });
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleFormStatus}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[85vh] 2xl:min-h-[60vh] 2xl:max-w-3xl
          xl:max-h-[85vh] xl:min-h-[50vh] xl:max-w-3xl 
          lg:max-h-[70vh] lg:min-h-[50vh] lg:max-w-2xl
          md:max-h-[79vh] md:min-h-[50vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleFormStatus}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-2 md:p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>
              {user ? "Actualizar usuario" : "Crear usuario"}
            </DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </div>

          {isCreateUserPending || isUpdateUserPending ? (
            <div className="p-6 flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="space-y-6 mt-4 flex-1"
            >
              {/* Input HTML normal */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Label htmlFor="is_active">
                    Moficar el acceso del usuario
                  </Label>
                  <Switch
                    id="is_active"
                    checked={isActive}
                    onCheckedChange={(checked) =>
                      setValue("is_active", checked)
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-1">
                    <Label>Nombre</Label>
                    <input
                      id="name"
                      type="text"
                      {...register("name", {
                        required: "El nombre es obligatorio",
                      })}
                      placeholder="Nombre"
                      className="mt-1 rounded-xl border border-gray-300 p-2 flex-1"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Apellido</Label>
                    <input
                      id="surname"
                      type="text"
                      {...register("surname", {
                        required: "El apellido es obligatorio",
                      })}
                      placeholder="Apellido"
                      className="mt-1 rounded-xl border border-gray-300 p-2 flex-1"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Nombre de usuario</Label>
                    <input
                      id="username"
                      type="text"
                      {...register("username", {
                        required: "El nombre de usuario es obligatorio",
                      })}
                      placeholder="Usuario"
                      className="mt-1 rounded-xl border border-gray-300 p-2 flex-1"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Nombre de usuario</Label>
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "La contraseña es obligatoria",
                      })}
                      placeholder="Contraseña"
                      className="mt-1 rounded-xl border border-gray-300 p-2 flex-1"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Email</Label>
                    <input
                      id="email"
                      type="text"
                      {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Ingrese un email válido",
                        },
                      })}
                      placeholder="Ingrese un email"
                      className="mt-1 rounded-xl border border-gray-300 p-2 flex-1"
                    />
                  </div>
                </>
              )}

              {/* Errores */}
              {createUserErr && !user && (
                <p style={{ color: "red" }}>{createUserErr}</p>
              )}

              {updateUserErr && !user && (
                <p style={{ color: "red" }}>{updateUserErr}</p>
              )}

              {/* Botones */}
              <div className="sticky bottom-0 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full active:scale-95 cursor-pointer"
                  onClick={toggleFormStatus}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="rounded-full active:scale-95 cursor-pointer"
                >
                  Guardar cambios
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
