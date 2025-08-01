
interface TagData {
  id: number;
  name: string;
  color: string;
  slug: string;
}

interface CardQuestionUserProps {
  id: string | number;
  title: string;
  created_at: string;
  question_tags: {
    tag: {
      id: number;
      name: string;
      color: string;
    };
  }[];
  question_comments?: {
    count: number;
  }[];
  user: {
    id: string | number;
    full_name: string;
  };
}


interface ResponseDataAnswers {
  id: number;
  text: string;
  question_id: number;
  user_id: string;
  created_at: string;
}

export type { TagData, CardQuestionUserProps, ResponseDataAnswers };