export interface ProductTypes {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductRequest {
    name: string;
    image: string;
    rating: number;
    price: number;
    description: string;
}