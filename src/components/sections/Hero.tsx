"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-First Developer</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Building the{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Future of AI
            </span>
            <br />
            Applications
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Full-stack developer specializing in Large Language Models, machine learning
            integration, and building intelligent applications that push the boundaries
            of what&apos;s possible.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/projects">
              <Button size="lg" className="group">
                View Projects
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="outline" size="lg">
                <Brain className="w-4 h-4 mr-2" />
                Try AI Playground
              </Button>
            </Link>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-12"
          >
            <p className="text-sm text-muted-foreground mb-6">Tech Stack</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {["Next.js", "TypeScript", "Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm text-muted-foreground"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
