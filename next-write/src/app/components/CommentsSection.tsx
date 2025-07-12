import { Box, Button, Heading, TextArea, Text } from "@radix-ui/themes";
import { useState } from "react";
import Comment, { type CommentType } from "./Comments";
type CommentsSectionProps = {
    postSlug: string;
    comments?: CommentType[];
    onCommentSubmit: (content: string, parentId: string | null) => Promise<void>;
};

export default function CommentsSection({ postSlug, comments = [], onCommentSubmit }: CommentsSectionProps) {
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCommentSubmit = async () => {
        setIsLoading(true);
        if (newComment.trim() === '') return;
        try {
            await onCommentSubmit(newComment, replyingTo);
            setNewComment('');
            setReplyingTo(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box mt="6">
            <Heading as="h3" size="5" mb="4">
                Comments ({comments.length})
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
                    <Button onClick={handleCommentSubmit} mt="2">
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


            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onReply={(id) => setReplyingTo(id)}
                    />
                ))
            ) : (
                <Text size="2" color="gray">
                    No comments yet. Be the first to comment!
                </Text>
            )}
        </Box>
    );
}