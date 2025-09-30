import { Section, Img, Text, Row, Column, Link } from "@react-email/components";

export function WelcomeTp({ name }: { name: string }) {
  return (
    <Section style={{ maxWidth: "672px", margin: "0 auto" }}>
      {/* Header */}
      <Section style={{ margin: "40px 0", padding: "40px 32px" }}>
        <Img
          alt="logo tudami"
          height={50}
          width={50}
          src="https://iyyeielwbsaybnczamix.supabase.co/storage/v1/object/public/files/tudami/logo.svg"
          style={{ objectFit: "contain" }}
        />
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "8px",
          }}
        >
          Tudami
        </Text>
      </Section>

      {/* Hero */}
      <Text style={{ fontSize: "28px", fontWeight: "600", lineHeight: "1.3" }}>
        Hola {name}, ¡Bienvenido/a a Tudami! 🎉
      </Text>
      <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
        Muchas gracias por unirte a nuestra comunidad. Esperamos que este sea el
        inicio de un camino lleno de aprendizaje, colaboración y nuevas
        oportunidades.
        <br />
        En Tudami podrás resolver dudas, ayudar a otros aprendices y conectar
        con personas que, como tú, buscan crecer profesionalmente.
      </Text>

      <hr style={{ margin: "20px 0" }} />

      {/* Steps */}
      <Text
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
      >
        🚀 Primeros pasos en Tudami
      </Text>

      <Text style={{ marginBottom: "15px" }}>
        ✅ <strong>Personaliza tu perfil</strong>
        <br />
        Dale tu toque personal configurando tu cuenta. Por defecto tu perfil es
        público, pero puedes cambiarlo cuando quieras y añadir información que
        te represente.{" "}
        <Link
          href="https://tudami.com/auth/login"
          style={{ textDecoration: "underline", fontWeight: "600" }}
        >
          Ir a mi perfil
        </Link>
      </Text>

      <Text style={{ marginBottom: "15px" }}>
        ✅ <strong>Publica tu primera pregunta</strong>
        <br />
        ¿Tienes una duda? ¡Compártela! Esa es la esencia de Tudami. Siempre
        encontrarás alguien dispuesto a ayudarte.{" "}
        <Link
          href="https://tudami.com/questions/create"
          style={{ textDecoration: "underline", fontWeight: "600" }}
        >
          Hacer una pregunta
        </Link>
      </Text>

      <Text style={{ marginBottom: "15px" }}>
        ✅ <strong>Explora ofertas de ayuda</strong>
        <br />
        Encuentra compañeros que ofrecen acompañamiento en distintas áreas y
        postúlate para aprender junto a ellos.{" "}
        <Link
          href="https://tudami.com/offers/explore"
          style={{ textDecoration: "underline", fontWeight: "600" }}
        >
          Ver ofertas
        </Link>
      </Text>

      <Text style={{ marginBottom: "15px" }}>
        ✅ <strong>Responde una pregunta</strong>
        <br />
        Compartir lo que sabes es la mejor forma de reforzar tu aprendizaje.
        Navega entre las dudas de otros aprendices y aporta tus conocimientos.{" "}
        <Link
          href="https://tudami.com/questions"
          style={{ textDecoration: "underline", fontWeight: "600" }}
        >
          Explorar preguntas
        </Link>
      </Text>

      <hr style={{ margin: "20px 0" }} />

      {/* Footer info */}
      <Text style={{ fontSize: "14px", lineHeight: "1.5" }}>
        Por favor, no respondas a este mensaje. Si deseas contactar con
        nosotros, hazlo siempre desde el apartado <strong>Soporte</strong> en tu
        área de cliente.
      </Text>

      {/* Footer brand */}
      <Section style={{ textAlign: "center", marginTop: "32px" }}>
        <Text
          style={{
            fontSize: "18px",
            fontWeight: "600",
            margin: "8px 0",
            background: "linear-gradient(to right, #dc2626, #2563eb)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Aprende con otros, comparte con todos.
        </Text>
        <Text
          style={{ fontSize: "16px", color: "#6b7280", marginBottom: "24px" }}
        >
          Aprende con otros, comparte con todos.
        </Text>

        {/* Social icons */}
        <Row style={{ display: "inline-flex", gap: "8px" }}>
          <Column>
            <Link href="https://facebook.com/tudami">
              <Img
                alt="Facebook"
                height="36"
                src="https://react.email/static/facebook-logo.png"
                width="36"
              />
            </Link>
          </Column>
          <Column>
            <Link href="https://x.com/tudami">
              <Img
                alt="X"
                height="36"
                src="https://react.email/static/x-logo.png"
                width="36"
              />
            </Link>
          </Column>
          <Column>
            <Link href="https://instagram.com/tudami">
              <Img
                alt="Instagram"
                height="36"
                src="https://react.email/static/instagram-logo.png"
                width="36"
              />
            </Link>
          </Column>
        </Row>

        <Text style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
          © 2025 Tudami. Todos los derechos reservados. Las marcas, logotipos y
          productos mencionados son propiedad de sus respectivos titulares.
        </Text>
      </Section>
    </Section>
  );
}
