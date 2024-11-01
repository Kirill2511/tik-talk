import { Profile } from '@tt/interfaces/profile';
import { Post } from '@tt/posts';

export interface Communities {
  items: Community[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Community {
  id: number;
  admin: Profile;
  name: string;
  themes: string[];
  bannerUrl: string;
  avatarUrl: string;
  description: string;
  subscribersAmount: number;
  createdAt: string;
  posts: Post[];
}
