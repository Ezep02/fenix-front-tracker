import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaChevronUp } from "react-icons/fa6";
import useTracking from "../../hooks/useTracking";
import TrackingItem from "../cards/TrackingItem";
import { motion } from "framer-motion";
import useTrackingAction from "../../hooks/useTrackingAction";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import OpenDetails from "./OpenDetails";

// extendemos DialogContent con motion
const MotionDialogContent = motion(DialogContent);

const OnTrackingList = () => {
  const { journeyList } = useTracking();

  const {
    onStartTracking,
    onSearchIsTracking,
    isDetailsOpen,
    toggleDetailOpen,
  } = useTrackingAction();

  return (
    <Dialog open={isDetailsOpen} onOpenChange={toggleDetailOpen}>
      {/* Botón trigger */}
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-2xl shadow-md bg-zinc-800 p-2.5 text-zinc-50 cursor-pointer hover:bg-zinc-700 active:scale-95 transition-colors"
        >
          <motion.div
            animate={{ rotate: isDetailsOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaChevronUp size={20} />
          </motion.div>
        </motion.button>
      </DialogTrigger>

      {/* Aquí ya no hace falta AnimatePresence, lo maneja Radix */}
      <MotionDialogContent
        forceMount
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          2xl:max-h-[95vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          flex flex-col z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
          p-6
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleDetailOpen}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-2 md:p-5 md:px-10 flex-1">
          <div>
            <DialogTitle className="text-lg text-start font-semibold text-zinc-700">
              Tus recorridos
            </DialogTitle>
            <DialogDescription className="text-start">
              Personaliza tu experiencia con opciones rápidas y fáciles de usar.
            </DialogDescription>
          </div>

          {/* Lista de recorridos */}
          <div className="pt-2">
            {journeyList?.length ? (
              <motion.div
                className="flex flex-col gap-3 overflow-x-auto scrollbar-none select-none"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {journeyList.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex-shrink-0 snap-start md:w-auto"
                  >
                    <TrackingItem
                      item={item}
                      onStartTracking={onStartTracking}
                      isTracking={onSearchIsTracking(item.id)}
                      actions={
                        <OpenDetails item={item}/>
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-gray-500 p-2">
                No hay recorridos planeados
              </p>
            )}
          </div>
        </div>
      </MotionDialogContent>
    </Dialog>
  );
};

export default OnTrackingList;
