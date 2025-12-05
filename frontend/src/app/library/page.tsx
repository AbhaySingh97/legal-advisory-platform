'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { articlesAPI } from '@/lib/api'
import { Search, Filter, BookOpen, X } from 'lucide-react'
import type { Article } from '@/types'

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

    // Fetch articles
    const { data: articles, isLoading } = useQuery({
        queryKey: ['articles', searchQuery, selectedCategory],
        queryFn: () =>
            articlesAPI.getAll({
                search: searchQuery || undefined,
                category: selectedCategory || undefined,
                limit: 100,
            }),
    })

    // Fetch categories
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: articlesAPI.getCategories,
    })

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/law-library.png"
                    alt="Law Library"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-12">
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center mb-12 fade-in-up">
                        <div className="flex justify-center mb-4">
                            <BookOpen className="w-16 h-16 text-primary-400" />
                        </div>
                        <h1 className="text-4xl font-display font-bold mb-4 text-white">Constitution Library</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Browse through the Indian Constitution articles with detailed descriptions and categorization
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="glass-card-light p-6 mb-8 fade-in-up">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search articles by title, keywords, or description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                                >
                                    <option value="">All Categories</option>
                                    {categories?.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(searchQuery || selectedCategory) && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {searchQuery && (
                                    <span className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                                        Search: {searchQuery}
                                        <button onClick={() => setSearchQuery('')} className="ml-2">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                )}
                                {selectedCategory && (
                                    <span className="inline-flex items-center bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">
                                        Category: {selectedCategory}
                                        <button onClick={() => setSelectedCategory('')} className="ml-2">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    {articles && (
                        <div className="mb-4 text-gray-200">
                            Found <span className="font-semibold text-white">{articles.length}</span> article{articles.length !== 1 && 's'}
                        </div>
                    )}

                    {/* Articles Grid */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
                            <p className="mt-4 text-gray-300">Loading articles...</p>
                        </div>
                    ) : articles && articles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <div key={article.id}>
                                    <ArticleCard
                                        article={article}
                                        onClick={() => setSelectedArticle(article)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 glass-card-light">
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No articles found. Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Article Detail Modal */}
            {selectedArticle && (
                <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
        </div>
    )
}

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="premium-card hover-lift cursor-pointer p-6 fade-in-up"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Article {article.number}
                </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-primary-300 transition-colors line-clamp-2">
                {article.title}
            </h3>
            <p className="text-sm text-gray-300 mb-3 line-clamp-3">{article.description}</p>
            <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{article.category}</span>
                <span className="text-primary-400 font-medium">Read more →</span>
            </div>
        </div>
    )
}

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                    <div>
                        <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">
                            Article {article.number}
                        </div>
                        <h2 className="text-2xl font-bold">{article.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h3>
                        <p className="text-gray-800">{article.category}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h3>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{article.description}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.keywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
