'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { casesAPI } from '@/lib/api'
import { Search, Gavel, Calendar, X, Scale } from 'lucide-react'
import type { LandmarkCase } from '@/types'

export default function CasesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedYear, setSelectedYear] = useState<string>('')
    const [selectedCase, setSelectedCase] = useState<LandmarkCase | null>(null)

    // Fetch cases
    const { data: cases, isLoading } = useQuery({
        queryKey: ['cases', searchQuery, selectedYear],
        queryFn: () =>
            casesAPI.getAll({
                search: searchQuery || undefined,
                year: selectedYear ? parseInt(selectedYear) : undefined,
                limit: 100,
            }),
    })

    // Get unique years from cases
    const years = cases
        ? Array.from(new Set(cases.map((c) => c.year)))
            .sort((a, b) => b - a)
        : []

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            {/* Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
                    alt="Supreme Court"
                    className="w-full h-full object-cover object-center opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-12">
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <Gavel className="w-16 h-16 text-primary-400" />
                        </div>
                        <h1 className="text-4xl font-display font-bold mb-4 text-white">Landmark Cases</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Explore landmark judgments that shaped Indian constitutional law
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search cases by name or keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            {/* Year Filter */}
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                                >
                                    <option value="">All Years</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(searchQuery || selectedYear) && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {searchQuery && (
                                    <span className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                                        Search: {searchQuery}
                                        <button onClick={() => setSearchQuery('')} className="ml-2">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                )}
                                {selectedYear && (
                                    <span className="inline-flex items-center bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">
                                        Year: {selectedYear}
                                        <button onClick={() => setSelectedYear('')} className="ml-2">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    {cases && (
                        <div className="mb-4 text-gray-200">
                            Found <span className="font-semibold text-white">{cases.length}</span> landmark case{cases.length !== 1 && 's'}
                        </div>
                    )}

                    {/* Cases Grid */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
                            <p className="mt-4 text-gray-300">Loading cases...</p>
                        </div>
                    ) : cases && cases.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {cases.map((caseItem) => (
                                <CaseCard
                                    key={caseItem.id}
                                    caseData={caseItem}
                                    onClick={() => setSelectedCase(caseItem)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg">
                            <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No cases found. Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Case Detail Modal */}
            {selectedCase && (
                <CaseModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />
            )}
        </div>
    )
}

function CaseCard({ caseData, onClick }: { caseData: LandmarkCase; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/20"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {caseData.year}
                </div>
                <Scale className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-white transition-colors line-clamp-2">
                {caseData.name}
            </h3>
            <p className="text-sm text-gray-300 mb-4 line-clamp-3">{caseData.significance}</p>
            <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{caseData.key_points.length} Key Points</span>
                <span className="text-primary-400 font-medium">Read more →</span>
            </div>
        </div>
    )
}

function CaseModal({ caseData, onClose }: { caseData: LandmarkCase; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {caseData.year}
                            </div>
                            <Scale className="w-6 h-6 text-primary-600" />
                        </div>
                        <h2 className="text-2xl font-bold">{caseData.name}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center">
                            <Gavel className="w-4 h-4 mr-2" />
                            Significance
                        </h3>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{caseData.significance}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Key Points</h3>
                        <ul className="space-y-3">
                            {caseData.key_points.map((point, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-800">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Related Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {caseData.keywords.map((keyword, index) => (
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
