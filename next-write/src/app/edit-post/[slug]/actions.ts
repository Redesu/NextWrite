import axios from "axios";

export async function updatePost({
    slug,
    title,
    description,
    content
}: {
    slug: string,
    title: string,
    description: string,
    content: string
}) {
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
            title,
            description,
            content
        }, {
            withCredentials: true
        });
        return {
            success: true,
            slug,
        }
    } catch (error) {
        console.error("Error creating post:", error);
        return {
            success: false,
            message: "Failed to update post. Please try again later."
        }
    }
}
