import React, { useState }  from "react";
import { SettingsIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProfileConfiguration from "../../sections/ProfileConfiguration";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Configuration: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDialog = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer rounded-full active:scale-95" size={"icon"}>
          <SettingsIcon size={24} />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-2xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-2xl 
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-2xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-xl  
          sm:max-h-[95vh] sm:min-h-[80vh] sm:max-w-xl  
          max-w-full max-h-full
          w-full min-h-full
          p-6 flex flex-col bg-zinc-50 z-50 sm:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll"
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button 
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer active:scale-95"
              onClick={toggleDialog}
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6 md:px-5">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-lg font-semibold text-zinc-700">
              Configuraciones
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-500">
              Personaliza tu experiencia con opciones rápidas y fáciles de usar.
            </DialogDescription>
          </div>

          <div className="h-full grid grid-cols-1 gap-3.5">
            {/* Main Content */}
            <ProfileConfiguration />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Configuration;
