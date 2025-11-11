import axios from "axios";

export async function getCommentsByPostSlug(slug: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}/comments`
    );

    if (!response.data) {
      console.log("No comments found for this post.");
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error loading comments:", error);
    return [];
  }
}

export async function postCommentToPostSlug(slug: string, content: string) {
  try {
    console.log("Posting comment to slug:", slug, "with content:", content);
    console.log("Using JSON body format: ", JSON.stringify({ content }));
    console.log("Environment API URL:", process.env.NEXT_PUBLIC_API_URL);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}/comments`,
      JSON.stringify({ content }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data) {
      throw new Error("Failed to post comment");
    }

    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
}
