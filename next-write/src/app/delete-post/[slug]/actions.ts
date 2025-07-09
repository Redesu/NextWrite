"use server";
import fs from 'fs/promises';
import path from 'path';

export async function deletePost(slug: string) {
    const filePath = path.join(process.cwd(), "src/app/posts", `${slug}.md`);

    try {
        await fs.unlink(filePath);
        return { success: true, message: "Post deleted successfully." };
    } catch (error) {
        console.error("Error deleting post:", error);
        return { success: false, message: "Failed to delete post. It may not exist." };
    }
}