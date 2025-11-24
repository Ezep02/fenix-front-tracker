import Sidebar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-[rgb(240,244,248)]">
      {/* SIDEBAR → Desktop (lateral izquierda) */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 w-full overflow-y-auto bg-zinc-50">
        <Outlet />
      </div>

      {/* SIDEBAR → Móvil (en el footer) */}
      <div className="block md:hidden fixed bottom-0 left-0 w-full z-40">
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
