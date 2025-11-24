import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full flex-1 bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner animado */}
        <motion.div
          className="w-12 h-12 border-4 border-t-gray-900 border-gray-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        {/* Texto minimalista */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "loop" }}
          className="text-gray-700 font-medium"
        >
          Cargando mapa...
        </motion.span>
      </div>
    </div>
  );
};

export default Loader;
