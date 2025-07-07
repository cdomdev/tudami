export interface Comments {
    id: number
    text: string
    question_id: number
    user_id: number
    created_at: string,
    users: {
        id: string;
        full_name: string;
        avatar_url: string | null;
    };
}