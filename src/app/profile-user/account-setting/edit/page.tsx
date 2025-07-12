import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FormUpdateDataProfile } from "../../components/forms/FormUpdateDataProfile";

export default function PageEditProfile() {
  return (
    <section className="dark:bg-custom-card  space-y-4 flex flex-col py-3 px-5 rounded-sm shadow-sm">
      <Link
        href="/profile-user/account-setting"
        className="group inline-flex items-center w-28 gap-1 px-3 py-2 rounded-md  text-base hover:bg-accent transition"
      >
        <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
        <span>Volver</span>
      </Link>
      <div>
        <FormUpdateDataProfile />
      </div>
    </section>
  );
}
