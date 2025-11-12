import axios from "axios";

export async function getCommentsByPostSlug(slug: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${slug}`
    );

    if (!response.data) {
      console.log("No comments found for this post.");
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error loading comments");
    return [];
  }
}

export async function addComment(slug: string, content: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${slug}`,
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

export async function updateComment(commentId: string, content: string) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/update/${commentId}`,
      JSON.stringify({ content }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data) {
      throw new Error("Failed to update comment");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/delete/${commentId}`,
      {
        withCredentials: true,
      }
    );

    if (!response.data) {
      throw new Error("Failed to delete comment");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}
