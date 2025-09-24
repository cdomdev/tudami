import { Text } from "@react-email/components";
import { BaseTemplate } from "@/emails/BasedTemplate";

interface Props {
  userName: string;
}

export function PasswordUpdated({ userName }: Props) {
  return (
    <BaseTemplate subject="Contraseña actualizada">
      <Text>Hola {userName},</Text>
      <Text>Tu contraseña se ha actualizado con éxito.</Text>
    </BaseTemplate>
  );
}
