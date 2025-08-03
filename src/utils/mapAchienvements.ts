import dataAchievements from "@/content/achievements/data-achievements.json";

interface UserAchievement {
    id: number | string;
    achievement_id: string;
}

export function getAchievementByuser(achievements: UserAchievement[]) {
    const achievementsObtained = achievements.map((i) => i.achievement_id);

    return dataAchievements
        .filter((ach) => achievementsObtained.includes(ach.achievement_id))
        .map((ach) => ({
            ...ach,
            obtaned: true,
        }));
}
