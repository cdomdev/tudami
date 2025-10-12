export function ByeTemplate({ name }: { name: string }) {
  const date = new Date();
  const year = date.getFullYear();

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
            Hasta pronto, {name} 👋
          </p>
          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#374151" }}>
            Lamentamos verte partir, pero entendemos y respetamos tu decisión de
            eliminar tu cuenta.
            <br />
            Si algo no salió como esperabas o simplemente necesitas un descanso,
            te agradecemos por haber sido parte de esta comunidad.
            <br />
            En <strong>Tudami</strong> creemos en el aprendizaje compartido, y
            siempre tendrás las puertas abiertas si decides volver.
          </p>

          <p
            style={{
              fontSize: "16px",
              marginTop: "24px",
              color: "#374151",
              lineHeight: "1.6",
            }}
          >
            <strong>¿Te gustaría regresar?</strong> Puedes crear una nueva cuenta
            en cualquier momento y continuar aprendiendo junto a otros
            aprendices.
          </p>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <a
              href="https://tudami.com/"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
                display: "inline-block",
              }}
            >
              Regresar a Tudami
            </a>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <hr
            style={{
              margin: "32px 0",
              border: "none",
              borderTop: "1px solid #e5e7eb",
            }}
          />
        </td>
      </tr>

      {/* Sección sobre datos del usuario */}
      <tr>
        <td style={{ padding: "0 32px" }}>
          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#4b5563" }}>
            De acuerdo con nuestros{" "}
            <a
              href="https://tudami.com/terms"
              style={{ color: "#2563eb", textDecoration: "none" }}
            >
              Términos de Uso
            </a>
            , toda tu información personal ha sido eliminada de manera segura.
            Sin embargo, las interacciones que realizaste dentro de la
            plataforma —como preguntas, respuestas o reacciones— permanecerán
            visibles bajo un perfil anónimo. Esto permite mantener la utilidad y
            el valor de la comunidad sin comprometer tu privacidad.
          </p>
        </td>
      </tr>

      <tr>
        <td>
          <hr
            style={{
              margin: "32px 0",
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
            nosotros, hazlo desde el apartado <strong>Soporte</strong> en la
            página principal.
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
            Gracias por haber formado parte de Tudami 💙
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
            © {year} Tudami. Todos los derechos reservados. Las marcas,
            logotipos y productos mencionados son propiedad de sus respectivos
            titulares.
          </p>
        </td>
      </tr>
    </table>
  );
}
