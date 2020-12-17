export interface Post {
  identifier: string;
  title: string;
  body?: string;
  slug: string;
  subName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  // virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}
