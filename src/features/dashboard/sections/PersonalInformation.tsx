import React, { useState, startTransition, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";

import { Edit2 } from "lucide-react";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { UpdateUserInfo } from "../services/configuration_service";

type PersonalInformationProps = {
  initUserData: User;
};

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  initUserData,
}) => {
  const { setUserInfo } = useContext(AuthContext)!;
  const [isEditing, setIsEditing] = useState(false);

  const [showError, setShowError] = useState(false);

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: initUserData,
  });

  const [updateErrMsg, submitAction, isPending] = useActionState(
    async (_: void | null, data: User) => {
      try {
        const updateResult = await UpdateUserInfo(initUserData.id, data);

        if (updateResult) {
          setUserInfo((prev) => {
            if (!prev) return prev;

            return {
              ...prev, // Mantengo TODO lo que ya tenía
              name: data.name,
              surname: data.surname || prev.surname,
              email: data.email || prev.email,
            };
          });
        }

        setIsEditing(false);
        reset(data);
      } catch (err: any) {
        return err?.response?.data?.error || "Error creando el post";
      }
    },
    undefined
  );

  const startSubmitTransition = (formData: User) => {
    startTransition(() => {
      submitAction(formData);
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
    <div className="pt-1.5">
      <div>
        {/* Encabezado */}
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Información Personal
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Actualiza tu información personal y de contacto.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(startSubmitTransition)}
          className="space-y-6 mt-8"
        >
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Nombre
            </Label>
            {isEditing ? (
              <input
                {...register("name", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={initUserData.name}
              />
            ) : (
              <span className="text-gray-500">{initUserData.name}</span>
            )}
          </div>

          {/* Apellido */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="surname"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Apellido
            </Label>
            {isEditing ? (
              <input
                {...register("surname", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={initUserData.surname}
              />
            ) : (
              <span className="text-gray-500">{initUserData.surname}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Email
            </Label>
            {isEditing ? (
              <input
                {...register("email", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={initUserData.email}
              />
            ) : (
              <span className="text-gray-500">{initUserData.email}</span>
            )}
          </div>

          <div className="flex justify-end">
            {!isEditing && (
              <Button
                type="button"
                variant="default"
                className="rounded-full active:scale-95 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={16} />
                Editar
              </Button>
            )}
          </div>

          {/* Mensaje de error que desaparece */}
          {showError && updateErrMsg && (
            <div className="flex bg-red-500 mt-2 p-2 rounded-md">
              <span className="text-sm font-medium text-zinc-50">
                {updateErrMsg}
              </span>
            </div>
          )}

          {/* Botones */}
          {isEditing && (
            <div className="flex flex-wrap gap-3 pt-6 justify-end">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full active:scale-95 cursor-pointer"
                onClick={() => {
                  reset(initUserData);
                  setIsEditing(false);
                }}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="rounded-full active:scale-95 cursor-pointer"
                disabled={isPending}
               
              >
                {isPending ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
