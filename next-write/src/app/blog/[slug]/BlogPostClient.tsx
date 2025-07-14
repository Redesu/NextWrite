'use client';
import { Box, Card, Flex, Heading, Text, Button } from "@radix-ui/themes";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentsSection from "@/app/components/CommentsSection";

export default function BlogPostClient({ post }: { post: any }) {
    const { user } = useAuth();
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [comments, setComments] = useState(post.comments || []);

    const handleCommentSubmit = async (content: string, parent_id: string | null) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${post.slug}`, {
                content,
                parent_id: parent_id || null
            }, {
                withCredentials: true
            });
            await loadComments();
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    }

    useEffect(() => {
        loadComments();
    }, [post.slug]);


    const loadComments = async () => {
        setIsLoadingComments(true);
        try {
            console.log("trying to load comments for post:", post.slug);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${post.slug}`, {
                withCredentials: true
            });
            console.log("Comments loaded:", response.data);
            setComments(response.data);
            return response.data;
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            setIsLoadingComments(false);
        }
    }


    return (
        <Flex justify="center" align="center" direction="column" minHeight="100vh">
            <Box width="100%" maxWidth="700px" p="5">
                <Card variant="classic" size="4" style={{ overflow: "visible" }}>
                    {user?.username === post.createdBy && (
                        <Flex justify="between" align="center" mb="4">
                            <Button asChild variant="soft" size="2">
                                <a href={`/edit-post/${post.slug}`}>Edit Post</a>
                            </Button>
                            <Button asChild variant="soft" size="2" color="red">
                                <a href={`/delete-post/${post.slug}`}>Delete Post</a>
                            </Button>
                        </Flex>
                    )}
                    <Heading as="h1" size="8" mb="4" align="center">
                        {post.title}
                    </Heading>
                    <Text as="div" size="3" color="gray" mb="6" align="center">
                        Published on: {post.date}
                    </Text>
                    <Box
                        asChild
                        mb="4"
                        style={{
                            lineHeight: 1.7,
                            fontSize: "1.1rem",
                            color: "var(--gray-12)",
                        }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                    </Box>
                    <Text as="p" size="2" color="gray" align="right">
                        Written by: {post.createdBy || "Anonymous"}
                    </Text>
                </Card>
            </Box>
            <CommentsSection
                postSlug={post.slug}
                comments={comments}
                onCommentSubmit={handleCommentSubmit}
                isLoading={isLoadingComments}
            />
        </Flex>
    );
}