export interface Article {
    id: number
    number: string
    title: string
    description: string
    category: string
    keywords: string[]
}

export interface LandmarkCase {
    id: number
    name: string
    year: number
    significance: string
    detailed_explanation?: string
    key_points: string[]
    keywords: string[]
}

export interface Procedure {
    id: number
    name: string
    description: string
    procedure: string
    keywords: string[]
}

export interface QuickReply {
    id: number
    text: string
    category?: string
    order: number
}

export interface ChatMessage {
    message: string
}

export interface ChatResponse {
    success: boolean
    message: string
    related_articles?: Article[]
}
