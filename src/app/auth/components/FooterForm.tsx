import Link from "next/link"

export function FooterForm() {
    return (
        <span className="text-muted-foreground text-sm text-center">
            Al continuar, aceptas los{" "}
            <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-primary"
            >
                Términos de servicio
            </Link>{" "}
            y{" "}
            <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-primary"
            >
                Política de privacidad
            </Link>{" "}
            de Tudami.
        </span>
    )
}