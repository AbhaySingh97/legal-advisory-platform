'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { proceduresAPI } from '@/lib/api'
import { Search, FileText, ChevronRight, X, ListChecks } from 'lucide-react'
import type { Procedure } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ProceduresPage() {
    const { t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)

    // Fetch procedures
    const { data: procedures, isLoading } = useQuery({
        queryKey: ['procedures', searchQuery],
        queryFn: () =>
            proceduresAPI.getAll({
                search: searchQuery || undefined,
                limit: 100,
            }),
    })

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
                    alt="Legal Documents"
                    className="w-full h-full object-cover object-center opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-12">
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-display font-bold mb-4 text-white">{t('procedures.title')}</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            {t('procedures.subtitle')}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 p-6 mb-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t('procedures.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        {/* Active Search */}
                        {searchQuery && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                <span className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                                    Search: {searchQuery}
                                    <button onClick={() => setSearchQuery('')} className="ml-2">
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    {procedures && (
                        <div className="mb-4 text-gray-200">
                            {t('procedures.found')} <span className="font-semibold text-white">{procedures.length}</span> {procedures.length === 1 ? t('procedures.procedure') : t('procedures.procedures')}
                        </div>
                    )}

                    {/* Procedures List */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
                            <p className="mt-4 text-gray-300">{t('common.loading')}</p>
                        </div>
                    ) : procedures && procedures.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {procedures.map((procedure) => (
                                <ProcedureCard
                                    key={procedure.id}
                                    procedure={procedure}
                                    onClick={() => setSelectedProcedure(procedure)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-lg">
                            <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-300">{t('procedures.noResults')}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Procedure Detail Modal */}
            {selectedProcedure && (
                <ProcedureModal procedure={selectedProcedure} onClose={() => setSelectedProcedure(null)} />
            )}
        </div>
    )
}

function ProcedureCard({ procedure, onClick }: { procedure: Procedure; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/20"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                    <ListChecks className="w-6 h-6 text-primary-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white transition-colors line-clamp-2">
                {procedure.name}
            </h3>
            <p className="text-sm text-gray-300 mb-4 line-clamp-3">{procedure.description}</p>
            <div className="flex items-center text-xs">
                <span className="text-primary-400 font-medium">View procedure →</span>
            </div>
        </div>
    )
}

function ProcedureModal({ procedure, onClose }: { procedure: Procedure; onClose: () => void }) {
    // Parse procedure steps (assuming they're separated by newlines or numbered)
    const steps = procedure.procedure
        .split(/\n+/)
        .filter((step) => step.trim())
        .map((step) => step.replace(/^\d+\.\s*/, '').trim())

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-6 flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                                <ListChecks className="w-6 h-6 text-primary-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{procedure.name}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0 text-gray-600 dark:text-gray-300"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Description
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{procedure.description}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">Step-by-Step Procedure</h3>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-0.5">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{step}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-300 mb-2">💡 Important Note</h3>
                        <p className="text-sm text-primary-800 dark:text-primary-200">
                            This is a general guide. For specific cases, it's recommended to consult with a legal professional
                            or visit the relevant government office for detailed requirements.
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Related Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {procedure.keywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
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
