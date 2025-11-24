import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserForm from "../dialogs/UserForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUsers from "../../hooks/useUsers";
import { Badge } from "@/components/ui/badge";

const StaffSection: React.FC = () => {

  const {usersList} = useUsers()

  return (
    <div className="rounded-2xl border border-zinc-200/80 lg:col-span-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estado</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>
              <div className="flex justify-end pr-1.5">
                Acciones
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(usersList) && usersList.length > 0 ? (
            usersList.map((user) => (
              <TableRow key={user.id} className="border-none">
                <TableCell>
                  <Badge>{user.is_active ? "Activo" : "De baja"}</Badge>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <UserForm
                      user={user}
                      trigger={
                        <Button
                          variant="ghost"
                          className="rounded-full active:scale-95 cursor-pointer"
                        >
                          <ArrowUpRight />
                          Abrir
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                Aún no se detectaron usuarios
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffSection;
