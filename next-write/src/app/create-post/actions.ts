import axios from "axios";

export async function createPost({
  title,
  description,
  content,
}: {
  title: string;
  description: string;
  content: string;
}) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`,
      {
        title,
        description,
        content,
      },
      {
        withCredentials: true,
      }
    );
    return {
      success: true,
      slug,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message: "Failed to create post. Please try again later.",
    };
  }
}
