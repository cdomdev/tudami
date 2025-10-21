"use client";
import { useEffect, useRef } from "react";

export function RenderContent({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inyectamos el HTML en el contenedor
    containerRef.current.innerHTML = content;

    // Procesar los bloques de código
    const pres = containerRef.current.querySelectorAll("pre");

    pres.forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code) return;

      // Crear botón de copiar
      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className =
        "absolute right-2 cursor-pointer transition top-2 px-2 py-1 text-xs rounded bg-neutral-400 dark:bg-neutral-500 text-white hover:bg-neutral-700 dark:hover:bg-neutral-600";

      // Posicionar y estilizar el bloque
      pre.classList.add(
        "relative",
        "group",
        "rounded-lg",
        "p-4",
        "overflow-x-auto"
      );
      code.classList.add(
        "text-sm",
        "font-mono",
        "text-emerald-400",
        "rounded",
        "px-1"
      );

      // Agregar botón y evento funcional
      button.addEventListener("click", () => {
        const text = code.textContent || "";
        navigator.clipboard.writeText(text);
        button.textContent = "Copied!";
        setTimeout(() => (button.textContent = "Copy"), 1500);
      });

      pre.appendChild(button);
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose dark:prose-invert max-w-none text-sm md:text-md"
    />
  );
}
