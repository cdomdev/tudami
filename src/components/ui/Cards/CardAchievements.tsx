import React from "react";

type AchievementProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export const CardAchievement: React.FC<AchievementProps> = ({
  title,
  description,
  icon,
  color,
}) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-sm gap-2 dark:bg-gray-200 flex items-center  max-w-60 hover:scale-[1.02] hover:shadow-md transition`}
    >
      <div className="relative rounded-full inline-flex overflow-hidden  p-[1px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3bbac6_0%,#265d7d_50%,#3bbac6_100%)]"></span>
        <div
          className="rounded-full text-2xl bg-gray-100  text-black dark:text-white/80 backdrop-blur-3xl whitespace-nowrap"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
      <div className="felx flex-col justify-start items-start">
        <h4 className="md:text-base  font-semibold  text-gray-700">{title}</h4>
        <p className="text-sm/3 text-gray-600 text-pretty ">{description}</p>
      </div>
    </div>
  );
};
