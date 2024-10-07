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

export interface ProductDto {
    id: number;
    name: string;
    imageUrl: string;
    description?: string;
    price: number;
    discount: number;
    quantity: number;
    categoryId: number;
    categoryName?: string;
    archived: boolean;
}