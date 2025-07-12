'use client';
import { Avatar, Box, Button, Flex, Heading, Link, Text } from "@radix-ui/themes";

export type CommentType = {
    id: string;
    username: string;
    created_at: string;
    content: string;
    replies?: CommentType[];
}
type CommentProps = {
    comment: CommentType;
    depth?: number;
    onReply: (id: string) => void;
};

export default function Comment({ comment, depth = 0, onReply }: CommentProps) {
    return (
        <Box
            style={{
                marginLeft: `${depth * 1.5}rem`,
                borderLeft: depth > 0 ? "2px solid var(--gray-4)" : "none",
                paddingLeft: depth > 0 ? "1rem" : "0",
            }}
        >
            <Flex gap="3" align="center" mb="2">
                <Avatar
                    fallback={comment.username[0].toUpperCase()}
                    size="2"
                    radius="full"
                />
                <Text weight="bold">{comment.username}</Text>
                <Text size="1" color="gray">
                    {new Date(comment.created_at).toLocaleDateString()}
                </Text>
            </Flex>
            <Text as="p" size="2" mb="3" style={{ whiteSpace: "pre-wrap" }}>
                {comment.content}
            </Text>
            <Button size="1" variant="ghost" onClick={() => onReply(comment.id)}>
                Reply
            </Button>

            {comment.replies?.map((reply) => (
                <Comment
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                    onReply={onReply}
                />
            ))}
        </Box>
    );
}
