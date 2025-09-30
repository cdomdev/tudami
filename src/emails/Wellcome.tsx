import { Section, Text } from "@react-email/components";

export function WelcomeTp({ name }: { name: string }) {
  return (
    <Section style={{ margin: "20px" }}>
      <Text style={{ fontSize: "30px" }} className="font-semibold">
        Hola {name}, ¡Bienvenido/a a Tudami! 🎉
      </Text>
      <Text className="text-balance">
        Muchas gracias por unirte a nuestra comunidad. Esperamos que este sea el
        inicio de un camino lleno de aprendizaje, colaboración y nuevas
        oportunidades. En Tudami podrás resolver dudas, ayudar a otros
        aprendices y conectar con personas que, como tú, buscan crecer
        profesionalmente.
      </Text>

      <hr style={{ margin: "20px 0" }} />

      <Text
        style={{ fontSize: "20px", fontWeight: "bold" }}
        className="text-balance"
      >
        🚀 Primeros pasos en Tudami
      </Text>

      <ul>
        <li style={{ marginBottom: "15px" }}>
          <Text>✅ Personaliza tu perfil</Text>
          <Text className="text-balance">
            Dale tu toque personal configurando tu cuenta. Por defecto, tu
            perfil es público, pero puedes cambiarlo cuando quieras y añadir
            información que te represente.
            <a href="https://tudami.com/auth/login" className="underline ml-1 font-semibold" target="_blank">
              Ir a mi perfil
            </a>
          </Text>
        </li>

        <li style={{ marginBottom: "15px" }}>
          <Text>✅ Publica tu primera pregunta</Text>
          <Text className="text-balance">
            ¿Tienes una duda? ¡Compártela! Esa es la esencia de Tudami. Siempre
            encontrarás alguien dispuesto a ayudarte.
            <a href="https://tudami.com/create/questions" className="underline ml-1 font-semibold">
              Hacer una pregunta
            </a>
          </Text>
        </li>

        <li style={{ marginBottom: "15px" }}>
          <Text>✅ Explora ofertas de ayuda</Text>
          <Text className="text-balance">
            Encuentra compañeros que ofrecen acompañamiento en distintas áreas y
            postúlate para aprender junto a ellos. Es una forma práctica de
            avanzar acompañado.
            <a href="https://..." className="underline">
              Ver ofertas
            </a>
          </Text>
        </li>

        <li style={{ marginBottom: "15px" }}>
          <Text>✅ Responde una pregunta</Text>
          <Text className="text-balance">
            Compartir lo que sabes es la mejor forma de reforzar tu aprendizaje.
            Navega entre las dudas de otros aprendices y aporta tus
            conocimientos.
            <a href="https://..." className="underline">
              Explorar preguntas
            </a>
          </Text>
        </li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <Text style={{ marginTop: "20px" }} className="text-balance">
        Por favor, no respondas a este mensaje. Si deseas contactar con
        nosotros, deberás hacerlo siempre a través del apartado Soporte para
        Área de cliente.
      </Text>
     
    </Section>
  );
}
