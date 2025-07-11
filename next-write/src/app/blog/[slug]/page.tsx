import { getPostBySlug } from "@/lib/posts";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import BlogPostClient from "./BlogPostClient";

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const param = await params;
    const post = await getPostBySlug(param.slug);
    const contentHtml = await remark().use(remarkGfm).use(remarkHtml).process(post.content);

    return (
        <BlogPostClient post={{ ...post, contentHtml: contentHtml.toString() }} />
    );
}