export interface ApiProduct {
    id: number;
    title: string;
    category: string;
    rating: number;
    stock: number;
    price: number;
    thumbnail: string;
}

export interface ProductsResponse {
    products: ApiProduct[];
}