export interface Session {
    id: string;
    history: Array<{
        role: 'user'|'assistant'|'system';
        content: string;
        timestamp: Date;
    }>;
    context: {
        current_products?: any[];
        last_recommendations?: any[];
        user_preferences?: {
            budget?: {
                min?: number,
                max?: number 
            },
            brand_preferences?: string[] 
        }
    }
}

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