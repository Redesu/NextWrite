import axios from "axios";

export async function deletePost(slug: string) {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
      withCredentials: true,
    });
    return {
      success: true,
      message: "Post deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      message: "Failed to delete post. It may not exist.",
    };
  }
}
