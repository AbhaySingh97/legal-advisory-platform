'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Sparkles, Info, X, ExternalLink } from 'lucide-react'
import { chatAPI } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m your legal advisory assistant. Ask me anything about the Indian Constitution, fundamental rights, landmark cases, or legal procedures.',
            sender: 'bot',
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showAboutModal, setShowAboutModal] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Fetch quick replies
    const { data: quickReplies } = useQuery({
        queryKey: ['quickReplies'],
        queryFn: chatAPI.getQuickReplies,
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input.trim()
        if (!textToSend) return

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            // Send to API
            const response = await chatAPI.sendMessage(textToSend)

            // Add bot response
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.message,
                sender: 'bot',
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botMessage])
        } catch (error) {
            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'bot',
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
            <div className="container-custom max-w-5xl">
                {/* Header */}
                <div className="text-center mb-8 relative">
                    {/* About Button */}
                    <button
                        onClick={() => setShowAboutModal(true)}
                        className="absolute top-0 right-0 bg-white hover:bg-primary-600 text-primary-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
                        aria-label="About Developer"
                    >
                        <Info className="w-6 h-6" />
                    </button>

                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-4 rounded-full">
                            <Bot className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-2">Legal Advisory Chatbot</h1>
                    <p className="text-gray-600">Ask me anything about Indian Constitution and Law</p>
                </div>

                {/* Chat Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Messages Area */}
                    <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        {isLoading && (
                            <div className="flex items-start space-x-3">
                                <div className="bg-primary-100 p-2 rounded-full">
                                    <Bot className="w-5 h-5 text-primary-600" />
                                </div>
                                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {quickReplies && quickReplies.length > 0 && (
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-2 flex items-center">
                                <Sparkles className="w-4 h-4 mr-1" />
                                Quick Questions:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {quickReplies.slice(0, 4).map((reply) => (
                                    <button
                                        key={reply.id}
                                        onClick={() => handleSend(reply.text)}
                                        className="text-sm bg-white border border-primary-200 text-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-50 hover:border-primary-300 transition-colors"
                                    >
                                        {reply.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-end space-x-3">
                            <div className="flex-1">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your legal question here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                    rows={1}
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className="bg-primary-600 text-white p-3 rounded-xl hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <InfoCard
                        title="Ask About Articles"
                        description="Query specific articles like 'What is Article 21?'"
                    />
                    <InfoCard
                        title="Legal Procedures"
                        description="Learn how to file PIL, RTI, and other procedures"
                    />
                    <InfoCard
                        title="Landmark Cases"
                        description="Explore important judgments and their significance"
                    />
                </div>

                {/* About Modal */}
                {showAboutModal && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
                        onClick={() => setShowAboutModal(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Profile Avatar */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <span className="text-3xl font-bold text-white">AS</span>
                                </div>

                                <h2 className="text-2xl font-bold mb-2">Abhay Singh Chauhan</h2>
                                <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">Full Stack Developer & AI Engineer</p>

                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Passionate about building intelligent applications that bridge the gap between technology and users.
                                </p>

                                {/* Portfolio Button */}
                                <a
                                    href="https://meet-abhay.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Visit Portfolio
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function MessageBubble({ message }: { message: Message }) {
    const isBot = message.sender === 'bot'

    return (
        <div className={`flex items-start space-x-3 ${!isBot && 'flex-row-reverse space-x-reverse'}`}>
            {/* Avatar */}
            <div className={`${isBot ? 'bg-primary-100' : 'bg-secondary-100'} p-2 rounded-full flex-shrink-0`}>
                {isBot ? (
                    <Bot className="w-5 h-5 text-primary-600" />
                ) : (
                    <User className="w-5 h-5 text-secondary-600" />
                )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 ${!isBot && 'flex justify-end'}`}>
                <div
                    className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl ${isBot
                        ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                        : 'bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-tr-none'
                        }`}
                >
                    {isBot ? (
                        <div className="prose prose-sm max-w-none">
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-sm">{message.text}</p>
                    )}
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${!isBot && 'text-right'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    )
}

function InfoCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-600">{description}</p>
        </div>
    )
}
