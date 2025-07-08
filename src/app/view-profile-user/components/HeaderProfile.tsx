import { BadgeCheck, Calendar, MapPin } from "lucide-react";
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
  return (
    <header className="  mt-3">
      <div className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Image
              src={avatar_url || "/logo.svg"}
              alt={full_name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full border-4 border-blue-200 object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1 right-5 bg-blue-500 text-white p-1 rounded-full">
              <BadgeCheck className="w-3 h-3" />
            </div>
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
                  {country}, {city} - {department}
                </span>
              </div>
            </div>
            {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              <Award className="w-4 h-4 mr-1" />
              {questions?.length || 0} Preguntas
            </span> */}
          </div>
        </div>
      </div>
    </header>
  );
}
