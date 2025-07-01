import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useSession } from '@/context/context.sesion'
import { useRouter } from "next/navigation"

interface CardProps {
  link?: string;
  paso: number;
  title: string;
  description: string;
  coment?: string[];
  iconUrl: string;
}

export const CardHowItWorks: FC<CardProps> = ({
  title,
  description,
  paso,
  link,
  coment,
  iconUrl,
}) => {

  const router = useRouter()
  const { user, openModal } = useSession()

  function handleBtnRedirect() {
    if (!user) {
      openModal()
    } else {
      router.push(`${link}`)
    }
  }
  return (
    <Link href={link || "#"} onClick={handleBtnRedirect}>
      <article className="w-11/12 mx-auto md:w-full relative rounded-xl overflow-hidden shadow-md p-6 transition-all backdrop-blur border border-white/10 bg-gradient-to-br from-[#ED2E7E]/20 to-[#4696FF]/20 dark:from-[#ED2E7E]/10 dark:to-[#4696FF]/10 min-h-96 hover:shadow-lg hover:border-blue-200 hover:dark:border-sky-300 duration-300 hover:scale-[1.02]">
        <header className="flex items-center gap-3 mb-4">
          {iconUrl && (
            <Image
              src={iconUrl}
              alt="Icono paso"
              className="w-8 h-8"
              width={32}
              height={32}
            />
          )}
          <p className="font-semibold text-sm text-muted-foreground">
            Paso {paso}
          </p>
        </header>

        <div className="relative z-10">
          <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-accent-foreground leading-relaxed mb-4">
            {description}
          </p>
          <div className="w-full h-px bg-accent my-4" />

          <div className="flex items-start gap-3 mb-4">
            <span className="bg-accent rounded-full p-2">
              <User2 size={24} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">Usuario</p>
              <p className="text-xs text-muted-foreground">user@mail.com</p>
            </div>
          </div>

          {coment && (
            <ul className="bg-muted/50 p-3 rounded-xl text-sm italic space-y-2">
              {coment.map((c, i) => (
                <li key={i} className="text-muted-foreground">
                  — {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Link>
  );
};
