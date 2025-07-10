import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export function getSortedPosts(offset = 0, limit = 10) {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            ...(data as { title: string; date: string; description: string, createdBy: string }),
            content,
        }
    });
    const sorted = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
    return sorted.slice(offset, offset + limit);
}


export function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        ...(data as { title: string; date: string; description: string; createdBy: string }),
        content,
    };
}