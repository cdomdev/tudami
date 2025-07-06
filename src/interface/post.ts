export interface Post {
  id: number;
  user_id: string;
  title: string;
  content: string;
  status?: string;
  created_at: string;
  updated_at?: string;

  users: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };

  question_tags?: {
    id: string;
    tag_id: string;
    tag: {
      id: string;
      name: string;
      color: string;
    };
  }[];

  question_likes?: {
    id: number;
    user_id: string;
    users: {
      id: string;
      full_name: string;
    };
  }[];

  question_comments?: {
    id: number;
    user_id: string;
    users: {
      id: string;
      full_name: string;
    };
  }[];


}
