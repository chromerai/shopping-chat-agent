export interface Review {
    rating: number;
    date: Date;
    comment: string;
    author: string;
}

export interface Phone {
    id: string;
    model: string;
    brand: string;
    price: number;
    specs: Record<string, any>;
    features: string[];
    image_url?: string;
    reviews: Review[]; 
}