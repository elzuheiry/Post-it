export type PostType = {
  title: string;
  id: string;
  createdAt?: string;
  author: {
    email: string;
    id: string;
    name: string;
    image: string;
  };
  comment?: {
    createdAt?: string;
    id: string;
    postId: string;
    title: string;
    authorId: string;
    author: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
