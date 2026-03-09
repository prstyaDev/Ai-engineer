import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "AI Chatbot with RAG",
    description:
      "Intelligent chatbot using Retrieval-Augmented Generation with custom knowledge base. Features semantic search, context-aware responses, and source citation.",
    tags: ["Next.js", "OpenAI", "LangChain", "Pinecone", "TypeScript"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/chatbot",
    featured: true,
  },
  {
    id: "2",
    title: "Image Generation API",
    description:
      "RESTful API for generating images using Stable Diffusion. Includes batch processing, custom model training, and webhook notifications.",
    tags: ["Python", "FastAPI", "Stable Diffusion", "Docker", "AWS"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/image-gen",
    featured: true,
  },
  {
    id: "3",
    title: "Sentiment Analysis Dashboard",
    description:
      "Real-time sentiment analysis dashboard for social media monitoring. Features live data streaming, custom alerts, and comprehensive analytics.",
    tags: ["React", "TensorFlow.js", "D3.js", "Twitter API"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/sentiment",
    featured: true,
  },
  {
    id: "4",
    title: "LLM Fine-tuning Pipeline",
    description:
      "Automated pipeline for fine-tuning large language models on custom datasets. Supports LoRA, QLoRA, and full parameter fine-tuning.",
    tags: ["Python", "PyTorch", "Hugging Face", "MLflow", "Kubernetes"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/llm-pipeline",
    featured: false,
  },
  {
    id: "5",
    title: "Voice AI Assistant",
    description:
      "Multimodal AI assistant with voice interaction capabilities. Supports speech recognition, natural language understanding, and text-to-speech.",
    tags: ["Next.js", "Whisper", "ElevenLabs", "OpenAI", "WebRTC"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/voice-ai",
    featured: false,
  },
  {
    id: "6",
    title: "Document Intelligence",
    description:
      "AI-powered document processing system that extracts structured data from PDFs, images, and scanned documents using computer vision.",
    tags: ["Python", "OpenCV", "LangChain", "PostgreSQL", "Redis"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/doc-intel",
    featured: false,
  },
];
