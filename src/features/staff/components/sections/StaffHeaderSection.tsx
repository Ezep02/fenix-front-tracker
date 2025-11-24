import UserForm from "../dialogs/UserForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const StaffHeaderSection = () => {
  return (
    <section>
      <header className="flex justify-between  items-center py-3 gap-3">
        {/* Saludo y fecha */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-700 tracking-tight">
            Personal
          </h2>
          <p className="text-muted-foreground">todo el personal registrado</p>
        </div>
        <div>
          <UserForm
            trigger={
              <Button
                className="rounded-full cursor-pointer active:scale-95"
                variant={"default"}
              >
                <PlusIcon />
                Registrar
              </Button>
            }
          />
        </div>
      </header>
    </section>
  );
};

export default StaffHeaderSection;
