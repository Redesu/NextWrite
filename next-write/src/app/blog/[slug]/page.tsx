import { getPostBySlug } from "@/lib/posts";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import BlogPostClient from "./BlogPostClient";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData?.post) {
    return notFound();
  }
  const contentHtml = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(postData.post.content);

  return (
    <>
      <BlogPostClient
        post={{ ...postData.post, contentHtml: contentHtml.toString() }}
      />
    </>
  );
}
