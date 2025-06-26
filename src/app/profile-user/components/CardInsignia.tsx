import React from "react";

type CardInsigniaProps = {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
  gradiente: string;
};

export const CardInsignia: React.FC<CardInsigniaProps> = ({
  titulo,
  descripcion,
  icono,
  gradiente,
}) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-sm flex items-center gap-4 hover:scale-[1.02] hover:shadow-md transition ${gradiente}`}
    >
      <div className="p-2 rounded-full bg-white shadow text-3xl flex items-center justify-center">
        {icono}
      </div>
      <div>
        <h4 className="text-base font-semibold  text-gray-700">{titulo}</h4>
        <p className="text-sm text-gray-600">{descripcion}</p>
      </div>
    </div>
  );
};
