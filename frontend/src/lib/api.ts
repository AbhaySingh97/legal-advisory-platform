import axios from 'axios'
import type { Article, LandmarkCase, Procedure, QuickReply, ChatMessage, ChatResponse } from '@/types'

const getBaseUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_URL

    // If no env var is set, or it's localhost but we're in the browser and not on localhost
    if (!url || url.includes('localhost')) {
        if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
            // We are in production but using localhost URL or no URL - fallback to production backend
            url = 'https://legal-advisory-platform-production.up.railway.app'
        } else {
            url = url || 'http://localhost:8000'
        }
    }

    // Remove trailing slash if present
    return url.endsWith('/') ? url.slice(0, -1) : url
}

const API_URL = getBaseUrl()
const API_V1 = `${API_URL}/api/v1`

console.log('API Configuration:', {
    rawUrl: process.env.NEXT_PUBLIC_API_URL,
    sanitizedUrl: API_URL,
    apiUrl: API_V1
})

const api = axios.create({
    baseURL: API_V1,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Chat API
export const chatAPI = {
    sendMessage: async (message: string): Promise<ChatResponse> => {
        const response = await api.post<ChatResponse>('/chat', { message })
        return response.data
    },

    getQuickReplies: async (): Promise<QuickReply[]> => {
        const response = await api.get<QuickReply[]>('/chat/quick-replies')
        return response.data
    },
}

// Articles API
export const articlesAPI = {
    getAll: async (params?: {
        skip?: number
        limit?: number
        category?: string
        search?: string
    }): Promise<Article[]> => {
        const response = await api.get<Article[]>('/articles', { params })
        return response.data
    },

    getByNumber: async (articleNumber: string): Promise<Article> => {
        const response = await api.get<Article>(`/articles/${articleNumber}`)
        return response.data
    },

    getCategories: async (): Promise<string[]> => {
        const response = await api.get<string[]>('/articles/categories/list')
        return response.data
    },
}

// Cases API
export const casesAPI = {
    getAll: async (params?: {
        skip?: number
        limit?: number
        year?: number
        search?: string
    }): Promise<LandmarkCase[]> => {
        const response = await api.get<LandmarkCase[]>('/cases', { params })
        return response.data
    },

    getById: async (caseId: number): Promise<LandmarkCase> => {
        const response = await api.get<LandmarkCase>(`/cases/${caseId}`)
        return response.data
    },
}

// Procedures API
export const proceduresAPI = {
    getAll: async (params?: {
        skip?: number
        limit?: number
        search?: string
    }): Promise<Procedure[]> => {
        const response = await api.get<Procedure[]>('/procedures', { params })
        return response.data
    },

    getById: async (procedureId: number): Promise<Procedure> => {
        const response = await api.get<Procedure>(`/procedures/${procedureId}`)
        return response.data
    },
}

export default api
