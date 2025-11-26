import {Phone, Session, ShoppingIntent} from "@/types/shopping"

export interface ReActStep {
    thought: string;
    action: string;
    action_input?: any;
    response: string;
}

export interface AgentResponse {
    response: string;
    type: 'success'|'safety_block'|'error';
    sessionId: string;
    iterations: number;
    data?: any;
}

export interface SafetyResult {
    safe: boolean;
    response?: string;
    reason: string;
    category?: 'shopping'| 'off_topic'| 'malicious';
}

export interface UserPreferences {
    use_case?: string;
    size_preferences?: 'compact'| 'standard' | 'large' | null;
    feature_priorities?: string[];
    budget: {min: number, max: number} | null;
    brand_preferences?: string[];
    os_preferences: 'android' | 'os' | null;
    must_have?: string[];
    deal_breakers?: string[]; 
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