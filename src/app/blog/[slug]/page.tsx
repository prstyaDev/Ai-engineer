import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | AI Engineer Blog`,
    description: post.description,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get all posts for the "More posts" section
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <article className="mb-12">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="primary">{formatDate(post.date)}</Badge>
                <Badge variant="outline">{post.author}</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground">{post.description}</p>
            </header>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* MDX Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {/* We'll render the MDX content here */}
              <MDXContent content={post.content} />
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card className="hover:border-primary/50 transition-colors h-full">
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// MDX Content component
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

function MDXContent({ content }: { content: string }) {
  // This is a simplified version - in production you'd use proper MDX components
  return (
    <div
      className="prose prose-invert prose-lg max-w-none
        prose-headings:text-foreground
        prose-p:text-muted-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:text-accent prose-code:bg-secondary prose-code:px-2 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-secondary prose-pre:border prose-pre:border-border
        prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
        prose-strong:text-foreground
        prose-li:text-muted-foreground"
    >
      {/* Render compiled MDX - simplified for now */}
      <div dangerouslySetInnerHTML={{ __html: content.replace(/<[^>]*>/g, (match) => {
        // Basic HTML passthrough - in production use proper MDX components
        return match;
      })}} />
    </div>
  );
}
