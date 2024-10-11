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

export interface CreateProductModel {
    name: string;
    imageUrl: string;
    description: string | null;
    price: number;
    discount: number;
    quantity: number;
    categoryId: number;
    archived: boolean;
}

export interface EditProductModel {
    id: number;
    name: string;
    imageUrl: string;
    description: string | null;
    price: number;
    discount: number;
    quantity: number;
    categoryId: number;
    archived: boolean;
}

export interface CategoryModel {
    id: number;
    name: string;
}