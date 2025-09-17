import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react"

type ButtonProps = React.ComponentProps<typeof Button>;


interface ButtonCsProps extends ButtonProps {
    text: string;
    icon?: LucideIcon;
    href?: string;
}

export function ButtonCs({ text, icon: Icon, href, ...props }: ButtonCsProps) {
    if (href) {
        return (
            <Button asChild className={cn("gap-2")} {...props}>
                <Link href={href}>
                    {Icon && <Icon className="w-4 h-4 " />}
                    {text}
                </Link>
            </Button>
        );
    }

    return (
        <Button className={cn("gap-2")} {...props}>
            {Icon && <Icon className="w-4 h-4" />}
            {text}
        </Button>
    );
}
