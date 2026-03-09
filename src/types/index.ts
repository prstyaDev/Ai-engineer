// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// Blog types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactFormData {
  id: string;
  createdAt: Date;
}

// AI Playground types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface AIModel {
  id: string;
  name: string;
  provider: "openai" | "huggingface";
  description: string;
}

export interface AIRequest {
  model: string;
  messages: { role: string; content: string }[];
  stream?: boolean;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
