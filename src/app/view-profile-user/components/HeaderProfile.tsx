import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { SchemaProfileResponse } from "../schema/schemaResponse";
import { formatJoinDate } from "@/utils/formatDate";

export function HeaderProfile({
  avatar_url,
  city,
  country,
  created_at,
  department,
  full_name,
}: SchemaProfileResponse) {
  const formattedCity = city || "Ciudad no especificada";
  const formattedCountry = country || "País no especificado";
  const formattedDepartment = department || "Departamento no especificado";

  const dataUbation = `${formattedCountry} - ${formattedCity} - ${formattedDepartment}`;
  return (
    <header className="mt-20">
      <div className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Image
              src={avatar_url || "/logo.svg"}
              alt={full_name}
              width={200}
              height={200}
              className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover shadow-md"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm mb-1 text-center text-accent-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Miembro desde {formatJoinDate(created_at.toString())}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {full_name}
            </h1>
            <div className="flex items-center mb-4 flex-col">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {dataUbation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
