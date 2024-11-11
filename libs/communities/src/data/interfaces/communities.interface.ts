import { Profile } from '@tt/interfaces/profile';
import { Post } from '@tt/posts';

export enum CommunityThemes {
  PROGRAMMING = 'PROGRAMMING',
  TECHNOLOGY = 'TECHNOLOGY',
  EDUCATION = 'EDUCATION',
  SPORT = 'SPORT',
  OTHER = 'OTHER',
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

export interface CommunityCreateDto {
  name: string | null;
  themes: CommunityThemes[] | null;
  tags: string[] | null;
  description: string | null;
}
