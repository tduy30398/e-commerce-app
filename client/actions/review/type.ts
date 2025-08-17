export interface ReviewRequest {
  comment: string;
  rating: number;
}

export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface ReviewType {
  _id: string;
  product: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
