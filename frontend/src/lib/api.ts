import axios from 'axios'
import type { Article, LandmarkCase, Procedure, QuickReply, ChatMessage, ChatResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const API_V1 = `${API_URL}/api/v1`

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
