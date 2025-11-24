import { User } from "@/types/user";
import { useActionState, useContext, useState } from "react";
import { registerUser, updateUser } from "../services/users";
import { StaffContext } from "../context/StaffContext";

const useUsersActions = () => {
  const { setUsersList } = useContext(StaffContext)!;

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const toggleFormStatus = () => {
    setIsFormOpen((prev) => !prev);
  };

  const [createUserErr, onCreateUserAction, isCreateUserPending] =
    useActionState(async (_: string | null, data: User) => {
      try {
        const res = await registerUser(data);
        if (res) {
          setUsersList((prev) => [...prev, res]);
          toggleFormStatus();
        }
        return res ? null : "No se pudo crear la promo";
      } catch (error: any) {
        return (
          error?.response?.data?.error ||
          error.message ||
          "Error creando promoción"
        );
      }
    }, null);

  const [updateUserErr, onUpdateUserAction, isUpdateUserPending] =
    useActionState(async (_: string | null, data: User) => {
      try {
        console.info("data", data)
        if (!data.id) return "Id de la del usuario no existe";
        const res = await updateUser(data);
        console.info(res)
        if (res) {
          setUsersList((prev) =>
            prev.map((curr) => (curr.id === data.id ? res : curr))
          );
          toggleFormStatus();
        }

        return res ? null : "No se pudo crear la promo";
      } catch (error: any) {
        return (
          error?.response?.data?.error ||
          error.message ||
          "Error dando de baja el usuario"
        );
      }
    }, null);

  return {
    // Registrar
    createUserErr,
    onCreateUserAction,
    isCreateUserPending,
    // Update
    updateUserErr,
    onUpdateUserAction,
    isUpdateUserPending,
    // Form actions
    isFormOpen,
    toggleFormStatus,
  };
};

export default useUsersActions;
