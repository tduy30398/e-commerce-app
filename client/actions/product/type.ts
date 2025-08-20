export interface ProductTypes {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  promotionalPrice?: number;
}

export interface ProductRequest {
  name: string;
  image: string;
  price: number;
  description: string;
  promotionalPrice?: number;
}
