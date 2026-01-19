export interface Post {
  _id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  title: string;
  body: string;
  author: string;
}
