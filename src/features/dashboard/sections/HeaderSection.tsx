import React from "react";
import Configuration from "../components/dialogs/Configuration";

interface HeaderSectionProps {
  userName: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ userName }) => {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Buen día!"
      : hours < 18
      ? "¡Buenas tardes!"
      : "¡Buenas noches!";

  const today = new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex justify-between  items-center py-3 gap-3">
      {/* Saludo y fecha */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-700 tracking-tight">
          {greeting} <span className="">{userName},</span>
        </h2>
        <p className="text-muted-foreground">{today}</p>
      </div>
      <div >
        <Configuration />
      </div>
    </header>
  );
};

export default HeaderSection;
