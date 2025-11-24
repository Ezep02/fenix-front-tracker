import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { PiFireTruckLight } from "react-icons/pi";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const { authenticatedUser } = useContext(AuthContext)!;

  const sidebarItems = [
    { icon: RiHomeLine, label: "Inicio", href: "/" },
    { icon: PiFireTruckLight, label: "Seguimiento", href: "/tracking" },
    { icon: FaUsers, label: "Personal", href: "/staff" },
  ];

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden md:flex flex-col bg-zinc-900 border-r border-gray-800 w-72 h-screen">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-800 flex items-center justify-center rounded-xl">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">
            Fenix
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wide">
            UI de utilidades
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div key={item.label} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={item.href}
                    className={`relative flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? "text-white bg-zinc-800"
                        : "text-gray-300 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-r-md" />
                    )}
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* Perfil */}
        <div className="p-5 border-t border-gray-800">
          <div className="text-sm font-medium text-white">
            {authenticatedUser?.name} {authenticatedUser?.surname}
          </div>
          <div className="text-xs text-gray-400">
            {authenticatedUser?.email}
          </div>
        </div>
      </div>

      {/* --- MOBILE NAVBAR (BOTTOM NAV) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-zinc-900 border-t border-gray-800 flex justify-around items-center z-50">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-violet-400" : "text-gray-400"
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
