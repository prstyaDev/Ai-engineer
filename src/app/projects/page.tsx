import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { projects } from "@/config/projects";

export const metadata: Metadata = {
  title: "Projects | prstyaDev Portfolio",
  description: "Explore my AI and machine learning projects",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Projects</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A collection of AI-powered applications, machine learning projects,
              and full-stack solutions I've built.
            </p>
          </div>

          {/* Projects Grid */}
          <ProjectsGrid projects={projects} />
        </div>
      </main>
      <Footer />
    </>
  );
}
