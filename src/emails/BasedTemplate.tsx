import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";

interface BaseTemplateProps {
  subject: string;
  children: React.ReactNode;
}

export const BaseTemplate = ({ subject, children }: BaseTemplateProps) => {
  return (
    <Html>
      <Head>
        <title>{subject}</title>
      </Head>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Navbar */}
        <Section
          style={{
            backgroundColor: "#4F46E5",
            padding: "10px 20px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Tudami</Text>
        </Section>

        {/* Contenido central */}
        <Container
          style={{
            backgroundColor: "#fff",
            margin: "20px auto",
            padding: "20px",
            borderRadius: 8,
          }}
        >
          {children}
        </Container>

        {/* Footer */}
        <Section
          style={{
            backgroundColor: "#e5e7eb",
            padding: "10px 20px",
            textAlign: "center",
            fontSize: 12,
            color: "#555",
          }}
        >
          <Text>
            © {new Date().getFullYear()} Tudami. Todos los derechos reservados.
            <br />
            <a
              href="https://tudami.com"
              style={{ color: "#4F46E5", textDecoration: "none" }}
            >
              Visita nuestro sitio
            </a>
          </Text>
        </Section>
      </Body>
    </Html>
  );
};
