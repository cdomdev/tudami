"use client";

import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import Image from "next/image";
import { RefreshCcw } from "lucide-react";

function getRandomSeed() {
  return Math.random().toString(36).substring(2, 10);
}

export default function EditorAvatar({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (seed: string) => void;
}) {
  const isUrl = value?.startsWith("http");

  let avatarPreview: React.JSX.Element;
  if (isUrl && value) {
    avatarPreview = (
      <Image
        src={value}
        alt="Avatar"
        className="w-32 h-32 border rounded bg-white shadow object-cover"
        width={128}
        height={128}
      />
    );
  } else {
    const seed = value || getRandomSeed();
    const svg = createAvatar(adventurer, { seed, size: 128 }).toString();
    avatarPreview = (
      <div
        className="w-32 h-32 border rounded flex items-center justify-center bg-white shadow"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  const handleGenerate = () => {
    const newSeed = getRandomSeed();
    onChange?.(newSeed); 
  };

  return (
    <div className="space-y-4">
      {avatarPreview}
      <button
        type="button"
        onClick={handleGenerate}
        className="px-3 py-1 bg-green-600 gap-2 flex items-center text-white rounded shadow hover:bg-green-700 transition cursor-pointer"
      >
        Generar Avatar
        <RefreshCcw className="w-4 h-4"/>
      </button>
    </div>
  );
}
