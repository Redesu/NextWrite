"use server"
import fs from 'fs/promises';
import path from 'path';

export async function updatePost({
    slug,
    title,
    description,
    createdBy,
    content,
}: {
    slug: string;
    title: string;
    description: string;
    createdBy: string;
    content: string;
}) {
    const date = new Date().toISOString().split('T')[0];
    const filePath = path.join(process.cwd(), "src/app/posts", `${slug}.md`);
    const mdContent = `---
title: "${title}"
date: "${date}"
description: "${description}"
createdBy: "${createdBy}"
---    
${content}
    `;
    await fs.writeFile(filePath, mdContent, 'utf8');
    return {
        success: true,
        slug,
    };
}