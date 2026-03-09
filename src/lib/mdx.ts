import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { frontmatter } = await compileMDX<{
      title: string;
      description: string;
      date: string;
      author: string;
      tags: string[];
    }>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
      },
    });

    posts.push({
      slug: file.replace(/\.mdx$/, ""),
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      author: frontmatter.author,
      tags: frontmatter.tags || [],
      content: fileContent,
    });
  }

  // Sort by date
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { frontmatter, content } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
  }>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  });

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    author: frontmatter.author,
    tags: frontmatter.tags || [],
    content: fileContent,
  };
}
