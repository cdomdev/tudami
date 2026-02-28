export interface UserActivity {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
}

export interface RecentResource {
  id: string;
  title: string;
  created_at: string;
  status: string;
  description: string;
  slug: string;
}

export interface RecentPost {
  id: string;
  title: string;
  created_at: string;
  status: string;
  content: string;
  slug: string;
}



export interface PanelData {
  totalUsers: number | null;
  totalResources: number | null;
  totalNews: number | null;
  userActivity: UserActivity[];
  recentResources: RecentResource[];
  recentPosts: RecentPost[];
  countPosts: number | null;
  countOffers: number | null;
}
