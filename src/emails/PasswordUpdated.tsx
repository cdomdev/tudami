export function PasswordUpdated({ email }: { email: string }) {
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
        <td style={{ padding: "32px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 600, margin: "0 0 16px" }}>
            ¡Hola {email}!
          </h2>
          <p
            style={{ fontSize: "16px", lineHeight: "1.6", margin: "0 0 16px" }}
          >
            Queremos informarte que tu contraseña ha sido{" "}
            <strong>restablecida con éxito 🎉</strong>.
          </p>
          <p style={{ fontSize: "16px", lineHeight: "1.6", margin: "0" }}>
            Si no realizaste esta acción, por favor{" "}
            <strong>cambia tu contraseña de inmediato </strong>y contacta con
            nuestro equipo de soporte.
          </p>
        </td>
      </tr>
      <tr>
        <td style={{ padding: "32px" }}>
          <a
            href="https://tudami.com/profile?id=1"
            style={{
              width: "40%",
              textAlign: "center",  
              display: "inline-block",
              backgroundColor: "blue",
              padding: "12px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "normal",
              color: "white"
            }}
            target="_blank"
          >
            Visitar mi perfil
          </a>
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
            © {year} Tudami. Todos los derechos reservados. Las marcas,
            logotipos y productos mencionados son propiedad de sus respectivos
            titulares.
          </p>
        </td>
      </tr>
    </table>
  );
}
