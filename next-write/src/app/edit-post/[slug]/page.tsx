import { getPostBySlug } from "@/lib/posts";
import EditPostClient from "./EditPostClient";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return <EditPostClient post={post} />;
}
