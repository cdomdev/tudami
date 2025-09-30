
export function WelcomeTp({ name }: { name: string }) {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <table
      align="center"
      border={0}
      cellPadding={0}
      cellSpacing={0}
      width="100%"
      style={{
        maxWidth: "672px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <tr>
        <td style={{ padding: "40px 32px", textAlign: "left" }}>
          <img
            src="https://iyyeielwbsaybnczamix.supabase.co/storage/v1/object/public/files/tudami/logo.png"
            alt="logo tudami"
            width="50"
            height="50"
            style={{
              objectFit: "contain",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginLeft: "8px",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            Tudami
          </span>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "0 32px" }}>
          <p style={{ fontSize: "28px", fontWeight: 600, lineHeight: "1.3" }}>
            Hola {name}, ¡Bienvenido/a a Tudami! 🎉
          </p>
          <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
            Muchas gracias por unirte a nuestra comunidad. Esperamos que este
            sea el inicio de un camino lleno de aprendizaje, colaboración y
            nuevas oportunidades.
            <br />
            En Tudami podrás resolver dudas, ayudar a otros aprendices y
            conectar con personas que, como tú, buscan crecer y ayudar en ese
            proceso.
          </p>
        </td>
      </tr>

      <tr>
        <td>
          <hr
            style={{
              margin: "20px 0",
              border: "none",
              borderTop: "1px solid #e5e7eb",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "0 32px" }}>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            🚀 Primeros pasos en Tudami
          </p>

          <p style={{ marginBottom: "15px" }}>
            ✅ <strong>Personaliza tu perfil</strong>
            <br />
            Dale tu toque personal configurando tu cuenta. Por defecto tu perfil
            es público, pero puedes cambiarlo cuando quieras y añadir
            información que te represente.{" "}
            <a
              href="https://tudami.com/auth/login"
              style={{
                textDecoration: "underline",
                fontWeight: 600,
                color: "#2563eb",
              }}
            >
              Ir a mi perfil
            </a>
          </p>

          <p style={{ marginBottom: "15px" }}>
            ✅ <strong>Publica tu primera pregunta</strong>
            <br />
            ¿Tienes una duda? ¡Compártela! Esa es la esencia de Tudami. Siempre
            encontrarás alguien dispuesto a ayudarte.{" "}
            <a
              href="https://tudami.com/questions/create"
              style={{
                textDecoration: "underline",
                fontWeight: 600,
                color: "#2563eb",
              }}
            >
              Hacer una pregunta
            </a>
          </p>

          <p style={{ marginBottom: "15px" }}>
            ✅ <strong>Explora ofertas de ayuda</strong>
            <br />
            Encuentra compañeros que ofrecen acompañamiento en distintas áreas y
            postúlate para aprender junto a ellos.{" "}
            <a
              href="https://tudami.com/offers/explore"
              style={{
                textDecoration: "underline",
                fontWeight: 600,
                color: "#2563eb",
              }}
            >
              Ver ofertas
            </a>
          </p>

          <p style={{ marginBottom: "15px" }}>
            ✅ <strong>Responde una pregunta</strong>
            <br />
            Compartir lo que sabes es la mejor forma de reforzar tu aprendizaje.
            Navega entre las dudas de otros aprendices y aporta tus
            conocimientos.{" "}
            <a
              href="https://tudami.com/questions"
              style={{
                textDecoration: "underline",
                fontWeight: 600,
                color: "#2563eb",
              }}
            >
              Explorar preguntas
            </a>
          </p>
        </td>
      </tr>

      <tr>
        <td>
          <hr
            style={{
              margin: "20px 0",
              border: "none",
              borderTop: "1px solid #e5e7eb",
            }}
          />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "0 32px" }}>
          <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#374151" }}>
            Por favor, no respondas a este mensaje. Si deseas contactar con
            nosotros, hazlo siempre desde el apartado <strong>Soporte</strong>
          </p>
        </td>
      </tr>

      <tr>
        <td align="center" style={{ padding: "32px" }}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 600,
              margin: "8px 0",
              background: "linear-gradient(to right, #dc2626, #2563eb)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Aprende con otros, comparte con todos.
          </p>
          <p
            style={{ fontSize: "16px", color: "#6b7280", marginBottom: "24px" }}
          >
            Aprende con otros, comparte con todos.
          </p>

          <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            style={{ margin: "0 auto" }}
          >
            <tr>
              <td style={{ padding: "0 4px" }}>
                <a href="https://facebook.com/tudami">
                  <img
                    src="https://react.email/static/facebook-logo.png"
                    alt="Facebook"
                    width="36"
                    height="36"
                  />
                </a>
              </td>
              <td style={{ padding: "0 4px" }}>
                <a href="https://x.com/tudami">
                  <img
                    src="https://react.email/static/x-logo.png"
                    alt="X"
                    width="36"
                    height="36"
                  />
                </a>
              </td>
              <td style={{ padding: "0 4px" }}>
                <a href="https://instagram.com/tudami">
                  <img
                    src="https://react.email/static/instagram-logo.png"
                    alt="Instagram"
                    width="36"
                    height="36"
                  />
                </a>
              </td>
            </tr>
          </table>

          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
            © {year} Tudami. Todos los derechos reservados. Las marcas, logotipos
            y productos mencionados son propiedad de sus respectivos titulares.
          </p>
        </td>
      </tr>
    </table>
  );
}
