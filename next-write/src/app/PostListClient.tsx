"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Spinner, Button } from "@radix-ui/themes";
import Link from "next/link";
import { getPaginatedPosts } from "./actions/getPaginatedPosts";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export default function PostListClient() {
    const [posts, setPosts] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initialLoadComplete, setinitialLoadComplete] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showScrollButton, setshowScrollButton] = useState(false);
    const limit = 10;

    const loadMore = async () => {
        setLoading(true);
        try {
            const newPosts = await getPaginatedPosts(offset, limit);

            if (!newPosts) {
                setHasMore(false);
                return;
            }

            if (newPosts.length === 0) {
                setHasMore(false);

                if (posts.length === 0) {
                    setinitialLoadComplete(true);
                }
                return;
            }
            setPosts(prev => [...prev, ...newPosts]);
            setOffset(offset + newPosts.length);
            setHasMore(newPosts.length === limit);
        } catch (error) {
            console.error("Error loading more posts:", error);
        } finally {
            setLoading(false);
            setinitialLoadComplete(true);
        }
    };
    const scrollToTop = () => {
        setshowScrollButton(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        if (!hasMore || loading) return;
        const handleScroll = () => {
            setshowScrollButton(window.scrollY > 300);
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
        <>
            <Flex direction="column" gap="6">
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <Link key={`${post.slug}-${post.created_at}-${index}`} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
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
                                        {post.created_by || "Anonymous"} • {new Date(post.created_at).toLocaleDateString()}
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
                    ))
                ) : initialLoadComplete ? (
                    <Text align="center" color="gray">
                        No posts found.
                    </Text>
                ) : null}
                {loading && <Spinner />}
                {!hasMore && posts.length > 0 && <Text align="center" color="gray">No more posts.</Text>}
            </Flex>
            {showScrollButton && (
                <Button
                    style={{
                        position: "fixed",
                        bottom: "2rem",
                        right: "2rem",
                        borderRadius: "50%",
                        width: "3rem",
                        height: "3rem",
                        padding: 0,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        transition: "opacity 0.3s ease",
                        opacity: showScrollButton ? 1 : 0,
                        pointerEvents: showScrollButton ? "auto" : "none",
                    }}
                    color="indigo"
                    size="2"
                    onClick={scrollToTop}
                >  <ArrowUpIcon width="24" height="24" />
                </Button>
            )}
        </>
    )
}