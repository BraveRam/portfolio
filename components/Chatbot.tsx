'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, BotMessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const { messages, sendMessage, status } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, status]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status === 'streaming' || status === 'submitted') return;

        sendMessage({ text: input });
        setInput('');
    };

    return (
        <>
            {/* Floating Chat Icon */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white text-black shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <BotMessageSquare className="w-6 h-6" />
            </motion.button>

            {/* Chat Dialog */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed bottom-6 right-6 z-50 w-full md:w-[512px] max-w-[calc(100vw-3rem)] md:max-w-[512px] h-[600px] max-h-[calc(100vh-3rem)] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-800">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-white">
                                        <MessageCircle className="w-4 h-4 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">AI Assistant</h3>
                                        <p className="text-xs text-zinc-400">Learn about me!</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-thumb]:rounded-full">
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full gap-6">
                                        <div className="text-center text-zinc-500">
                                            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">Learn about me!</p>
                                        </div>

                                        <div className="flex flex-col gap-2 w-full max-w-sm">
                                            <p className="text-xs text-zinc-600 mb-1">Suggestions:</p>
                                            {[
                                                "Tell me about your experience",
                                                "What technologies do you use?",
                                                "Show me your projects",
                                                "How can I contact you?"
                                            ].map((suggestion, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setInput(suggestion);
                                                        sendMessage({ text: suggestion });
                                                        setInput('');
                                                    }}
                                                    className="text-left px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-black" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                                ? 'bg-white text-zinc-900'
                                                : 'bg-zinc-800 text-zinc-100'
                                                }`}
                                        >
                                            <div className="text-sm prose prose-sm prose-invert max-w-none">
                                                {message.parts.map((part, i) => {
                                                    switch (part.type) {
                                                        case 'text':
                                                            return (
                                                                <ReactMarkdown
                                                                    key={`${message.id}-${i}`}
                                                                    remarkPlugins={[remarkGfm]}
                                                                    components={{
                                                                        a: ({ node, ...props }) => (
                                                                            <a
                                                                                {...props}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-400 hover:text-blue-300 underline break-all"
                                                                            />
                                                                        ),
                                                                        code: ({ node, className, children, ...props }) => {
                                                                            const inline = !className;
                                                                            return inline ? (
                                                                                <code className="bg-zinc-700 px-1 py-0.5 rounded text-xs" {...props}>
                                                                                    {children}
                                                                                </code>
                                                                            ) : (
                                                                                <code className={`${className} block bg-zinc-700 p-2 rounded text-xs overflow-x-auto`} {...props}>
                                                                                    {children}
                                                                                </code>
                                                                            );
                                                                        },
                                                                        ul: ({ node, ...props }) => (
                                                                            <ul className="list-disc list-inside my-2" {...props} />
                                                                        ),
                                                                        ol: ({ node, ...props }) => (
                                                                            <ol className="list-decimal list-inside my-2" {...props} />
                                                                        ),
                                                                        p: ({ node, ...props }) => (
                                                                            <p className="mb-2 last:mb-0" {...props} />
                                                                        ),
                                                                        strong: ({ node, ...props }) => (
                                                                            <strong className="font-semibold" {...props} />
                                                                        ),
                                                                    }}
                                                                >
                                                                    {part.text}
                                                                </ReactMarkdown>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        {message.role === 'user' && (
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {status === 'submitted' && (
                                    <div className="flex gap-2 justify-start">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-black" />
                                        </div>
                                        <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-zinc-800 text-zinc-100">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Scroll anchor */}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.currentTarget.value)}
                                        placeholder="What do you build..."
                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                                        disabled={status === 'streaming' || status === 'submitted'}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'streaming' || status === 'submitted' || !input.trim()}
                                        className="p-2 rounded-xl bg-white text-black hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
