import { Text } from "@react-email/components";

interface Props {
  userName: string;
}

export function PasswordUpdated({ userName }: Props) {
  return (
    <>
      <Text>Hola {userName},</Text>
      <Text>Tu contraseña se ha actualizado con éxito.</Text>
    </>
  );
}
