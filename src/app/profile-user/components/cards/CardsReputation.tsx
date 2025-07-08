import Image from "next/image";
import { getColorByLevel } from "../../utils/reputacion";

export function CardReputaction({
  progresoReputacion,
}: {
  progresoReputacion: {
    actual: {
      nombre: string;
      image?: string;
      imageAlt?: string;
    };
  };
}) {
  return (
    <div
      className="rounded-2xl p-5 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] relative overflow-hidden z-0 backdrop-blur-xl bg-white/10 border border-white/20"
      style={{
        background: `linear-gradient(145deg, ${getColorByLevel(
          progresoReputacion.actual.nombre
        )}), rgba(255,255,255,0.1)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-60 z-[-1]"></div>
      <div className="bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-2xl shadow-2xl flex px-4 py-2 items-center justify-center gap-3 rounded-2xl border border-white/30">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/40">
          <Image
            src={progresoReputacion.actual.image || "/principiante.svg"}
            width={40}
            height={40}
            alt={progresoReputacion.actual.imageAlt || "Nivel de principiante"}
            className="drop-shadow-sm filter"
          />
        </div>
        <p className="inline-block px-4 py-1 bg-gradient-to-r from-white via-gray-100 to-white text-transparent bg-clip-text rounded-full text-sm font-black tracking-wide">
          {progresoReputacion.actual.nombre}
        </p>
      </div>
      <p className="mt-3 text-xs text-white/90 font-bold drop-shadow-lg tracking-wider uppercase">
        Nivel de reputación
      </p>
    </div>
  );
}
