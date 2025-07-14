import { Box, Button, Heading, TextArea, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Comment, { type CommentType } from "./Comments";
import { countAllComments } from "@/lib/comments/commentsUtils";
type CommentsSectionProps = {
    postSlug: string;
    comments?: CommentType[];
    onCommentSubmit: (content: string, parentId: string | null) => Promise<void>;
    isLoading?: boolean;
};

export default function CommentsSection({ postSlug, comments = [], onCommentSubmit, isLoading = false }: CommentsSectionProps) {
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [isisSubmitting, setIsSubmitting] = useState(false);

    const handleCommentSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onCommentSubmit(newComment, replyingTo);
            setNewComment('');
            setReplyingTo(null);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Box mt="6">
            <Heading as="h3" size="5" mb="4">
                Comments {isLoading ? "" : `(${countAllComments(comments)})`}
            </Heading>

            {/* <Button onClick={() => setReplyingTo(null)}>Add Comment</Button> */}

            {replyingTo ? (
                <Box mt="3">
                    <TextArea
                        placeholder={
                            replyingTo
                                ? `Replying to comment #${replyingTo}...`
                                : "Write a comment..."
                        }
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={handleCommentSubmit} mt="2" style={{ marginBottom: '3rem' }} disabled={isisSubmitting || !newComment.trim()}>
                        {replyingTo ? "Post Reply" : "Post Comment"}
                    </Button>
                </Box>
            ) : (
                <Box mt="3">
                    <TextArea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={handleCommentSubmit} mt="2" disabled={isLoading || !newComment.trim()}>
                        {isLoading ? "Posting..." : "Post Comment"}
                    </Button>
                </Box>
            )}

            <Box
                style={{
                    minWidth: '650px',
                }}
            >
                {isLoading ? (
                    <Text mt="4">Loading comments...</Text>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            onReply={(id) => setReplyingTo(id)}
                        />
                    ))
                ) : (
                    <Text mt="4">No comments yet. Be the first to comment!</Text>
                )}
            </Box>

        </Box>
    );
}