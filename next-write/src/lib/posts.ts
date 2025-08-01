import axios from "axios";
import { notFound } from "next/navigation";



export async function getSortedPosts(offset = 0, limit = 10) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?offset=0&limit=10`, {});
        if (!response.data) {
            return [];
        }
        console.log("response.data", response.data);
        return response.data;
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}


export async function getPostBySlug(slug: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`);

        if (!response.data) {
            console.error("No post found with slug:", slug);
            return notFound();
        }
        console.log("post found and using the data: ", response.data)
        return {
            post: response.data
        }
    } catch (error) {
        console.error("Error loading post:", error);
    }
}