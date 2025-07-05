"use server"
import fs from 'fs/promises';
import path from 'path';

export async function createPost({
    title,
    description,
    content
}: {
    title: string;
    description: string;
    content: string;
}) {
    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const filePath = path.join(process.cwd(), "src/app/posts", `${slug}.md`);
    const mdContent = `---
title: "${title}"
date: "${date}"
description: "${description}"
---
    
${content}
    `;
    await fs.writeFile(filePath, mdContent, 'utf8');
    return {
        success: true,
        slug,
    }
}