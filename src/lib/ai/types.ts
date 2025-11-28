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
export interface AgentResponse {
    response: string;
    type: 'success'|'safety_block'|'error';
    sessionId: string;
    iterations: number;
    data?: any;
}

export interface HumanInputResponse {
  status: 'AWAITING_INPUT';
  message: string;
  context: any;
}

export type AgentResult = AgentResponse | HumanInputResponse;

export interface SafetyResult {
    safe: boolean;
    response?: string;
    reason: string;
    category?: 'shopping'| 'off_topic'| 'malicious';
}
export interface PhoneFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  features?: string[];
  operating_system?: 'android' | 'ios';
}

export interface ScoredPhone {
    phone: Phone;
    score: number;
    matchReasons: string[];
    tradeoffs: string[];
}

export interface RecommendationResult {
    recommendations: ScoredPhone[];
    rationale: string;
    querySummary: string; 
}

export interface ComparisonResult {
    phones: Phone[];
    differences: string[];
    recommendations: string[];
}