import { Section, Img, Text, Row, Column, Link } from "@react-email/components";

export function TemplateBase({ children }: { children: React.ReactNode }) {
  return (
    <Section className="max-w-2xl mx-auto  mt-30 dark:bg-white text-black">
      <Section className="my-[40px] px-[32px] py-[40px]">
        <Row className="mx-6">
          <Column className="flex gap-x-2">
            <Img
              alt="logo tudami"
              height={50}
              width={50}
              className="object-contain"
              src="https://iyyeielwbsaybnczamix.supabase.co/storage/v1/object/public/files/tudami/logo.svg"
            />
            <Text
              className="font-semibold text-[32px]"
              style={{ fontSize: "20px" }}
            >
              Tudami
            </Text>
          </Column>
        </Row>
      </Section>
      <Section>{children}</Section>

      <Section className="text-center">
        <table className="w-full">
          <tr className="w-full">
            <td align="center">
              <Text className="my-[8px] font-semibold text-[16px] leading-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600  to-blue-600">
                Aprende con otros, comparte con todos.
              </Text>
              <Text className="mt-[4px] mb-0 text-[16px] text-gray-500 leading-[24px]">
                Pensar diferente
              </Text>
            </td>
          </tr>
          <tr>
            <td align="center">
              <Row className="table-cell h-[44px] w-[56px] align-bottom">
                <Column className="pr-[8px]">
                  <Link href="#">
                    <Img
                      alt="Facebook"
                      height="36"
                      src="https://react.email/static/facebook-logo.png"
                      width="36"
                    />
                  </Link>
                </Column>
                <Column className="pr-[8px]">
                  <Link href="#">
                    <Img
                      alt="X"
                      height="36"
                      src="https://react.email/static/x-logo.png"
                      width="36"
                    />
                  </Link>
                </Column>
                <Column>
                  <Link href="#">
                    <Img
                      alt="Instagram"
                      height="36"
                      src="https://react.email/static/instagram-logo.png"
                      width="36"
                    />
                  </Link>
                </Column>
              </Row>
            </td>
          </tr>
          <tr>
            <td align="center">
              <Text className="my-[8px] font-semibold text-[16px] text-gray-500 leading-[24px]">
                © 2025 Tudami.
              </Text>
              <Text className="mt-[4px] mb-0 font-normal text-[16px] text-gray-500 leading-[24px] text-balance">
                Todos los derechos reservados. Las marcas, logotipos y productos
                mencionados son propiedad de sus respectivos titulares.
              </Text>
            </td>
          </tr>
        </table>
      </Section>
    </Section>
  );
}
