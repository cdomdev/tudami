import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Perfil de usuario",
  description: "Visualiza y edita tu perfil de usuario en Tudami.",
};

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="grid h-full min-h-screen place-items-center grid-cols-1 lg:grid-cols-8">
        <section className="grid place-items-center border-r bg-custom-card w-full h-full p-4 lg:col-span-3 lg:mr-7">
          {children}
        </section>
        <aside className="md:col-span-5 relative  flex flex-col justify-center items-center w-full h-full px-6 py-8 overflow-hidden">
          <div
            className="relative z-10 text-center space-y-4 animate-me"
            aria-hidden="true"
          >
            <Image
              src="/logo.svg"
              alt="Logo Tudami"
              width={90}
              height={90}
              className="mx-auto mb-6"
              priority
            />
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-teal-400">
              Aprende con otros,
              <br />
              comparte con todos.
            </h2>
            <p className="text-sm lg:text-base max-w-xs mx-auto text-slate-700 dark:text-slate-300">
              Únete a Tudami y conecta con aprendices que quieren ayudarte a
              crecer.
            </p>
          </div>
        </aside>
      </main>
    </>
  );
}
