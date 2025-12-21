'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, ArrowUp, User, Bot, BotMessageSquare } from 'lucide-react';
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

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status === 'streaming' || status === 'submitted') return;

        sendMessage({ text: input });
        setInput('');
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <BotMessageSquare className="w-6 h-6" />
            </motion.button>

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

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed bottom-6 right-6 z-50 w-full md:w-[512px] max-w-[calc(100vw-3rem)] md:max-w-[512px] h-[600px] max-h-[calc(100vh-3rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-primary">
                                        <MessageCircle className="w-4 h-4 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Ask about me</h3>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg cursor-pointer hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full gap-6">
                                        <div className="text-center text-muted-foreground">
                                            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">Learn about me!</p>
                                        </div>

                                        <div className="flex flex-col gap-2 w-full max-w-sm">
                                            <p className="text-xs text-muted-foreground mb-1">Suggestions:</p>
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
                                                    className="text-left px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm transition-colors cursor-pointer"
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
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-primary-foreground" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary text-secondary-foreground'
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
                                                                                className="text-primary hover:text-primary/80 underline break-all"
                                                                            />
                                                                        ),
                                                                        code: ({ node, className, children, ...props }) => {
                                                                            const inline = !className;
                                                                            return inline ? (
                                                                                <code className="bg-accent/50 px-1 py-0.5 rounded text-xs" {...props}>
                                                                                    {children}
                                                                                </code>
                                                                            ) : (
                                                                                <code className={`${className} block bg-accent/50 p-2 rounded text-xs overflow-x-auto`} {...props}>
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
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                                <User className="w-4 h-4 text-foreground" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {status === 'submitted' && (
                                    <div className="flex gap-2 justify-start">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-primary-foreground" />
                                        </div>
                                        <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-secondary text-secondary-foreground">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background/50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.currentTarget.value)}
                                        placeholder="What do you build..."
                                        className="flex-1 bg-background border border-input rounded-xl px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        disabled={status === 'streaming' || status === 'submitted'}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'streaming' || status === 'submitted' || !input.trim()}
                                        className="p-2 rounded-xl cursor-pointer bg-primary text-primary-foreground hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ArrowUp className="w-5 h-5" />
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
