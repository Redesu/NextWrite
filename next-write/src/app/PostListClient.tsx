"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Button, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { getPaginatedPosts } from "./actions/getPaginatedPosts";

export default function PostListClient() {
    const [posts, setPosts] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const loadMore = async () => {
        setLoading(true);
        const newPosts = await getPaginatedPosts(offset, limit);
        setPosts(prev => [...prev, ...newPosts]);
        setOffset(offset + newPosts.length);
        setHasMore(newPosts.length === limit);
        setLoading(false);
    };

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        if (!hasMore || loading) return;
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading && hasMore) {
                loadMore();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadMore, loading, hasMore]);

    return (
        <Flex direction="column" gap="6">
            {posts.map((post, index) => (
                <Link key={`${post.slug}-${post.date}-${index}`} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <Box
                        p="4"
                        mb="2"
                        style={{
                            border: "1px solid var(--gray-5)",
                            borderRadius: "12px",
                            background: "var(--gray-1)",
                            transition: "box-shadow 0.2s",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                            cursor: "pointer",
                        }}
                    >
                        <Flex align="center" gap="4" mb="2">
                            <Text size="2" color="gray">
                                {post.createdBy || "Anonymous"} • {new Date(post.date).toLocaleDateString()}
                            </Text>
                        </Flex>
                        <Heading as="h2" size="5" mb="1" color="indigo">
                            {post.title}
                        </Heading>
                        <Text size="3" color="gray">
                            {post.description}
                        </Text>
                    </Box>
                </Link>
            ))}
            {loading && <Spinner />}
            {!hasMore && <Text align="center" color="gray">No more posts.</Text>}
        </Flex>
    );
}