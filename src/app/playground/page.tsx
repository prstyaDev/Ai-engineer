"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, AlertCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types";

type AIMode = "summarize" | "sentiment" | "text-generator";

const aiModes: { id: AIMode; name: string; description: string }[] = [
  {
    id: "summarize",
    name: "Text Summarizer",
    description: "Condense long text into concise summaries",
  },
  {
    id: "sentiment",
    name: "Sentiment Analysis",
    description: "Analyze emotions and sentiment in text",
  },
  {
    id: "text-generator",
    name: "Text Generator",
    description: "Generate creative text continuations",
  },
];

export default function PlaygroundPage() {
  const [selectedMode, setSelectedMode] = useState<AIMode>("summarize");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input,
          mode: selectedMode,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      if (reader) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessage.id
                ? { ...msg, content: assistantMessage }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">AI Playground</h1>
              <Badge variant="accent" className="ml-2">
                <Sparkles className="w-3 h-3 mr-1" />
                Demo
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              Interact with AI models and see real-time streaming responses
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mode Selector */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Select Mode
              </h2>
              <div className="space-y-2">
                {aiModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setSelectedMode(mode.id);
                      clearChat();
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all",
                      selectedMode === mode.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="font-medium">{mode.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {mode.description}
                    </div>
                  </button>
                ))}
              </div>

              {/* Mock Mode Notice */}
              <Card className="bg-accent/10 border-accent/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-accent">
                      Running in <strong>Mock Mode</strong>. Set{" "}
                      <code>OPENAI_API_KEY</code> in .env to use real AI.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b border-border">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      {aiModes.find((m) => m.id === selectedMode)?.name}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={clearChat}>
                      Clear Chat
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Send a message to start the conversation
                      </p>
                    </div>
                  )}

                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex gap-3",
                          message.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] p-4 rounded-lg",
                            message.role === "user"
                              ? "bg-primary text-white"
                              : "bg-secondary"
                          )}
                        >
                          <div className="text-sm whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={`Enter text to ${selectedMode.replace("-", " ")}...`}
                      className="flex-1 h-12 px-4 rounded-lg border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
