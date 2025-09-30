import { TemplateBase } from "@/components/mails/TemplateBase";
import { WelcomeTp } from "@/emails/Wellcome";
export default function page() {
  return (
    <TemplateBase>
      <WelcomeTp name="Carlos" />
    </TemplateBase>
  );
}
