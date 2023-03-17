export type AuthPosts = {
  email: string;
  id: string;
  name: string;
  image: string;
  post?: {
    createdAt: string;
    id: string;
    title: string;
    comment?: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      authorId: string;
    }[];
  }[];
};
