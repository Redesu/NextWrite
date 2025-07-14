'use client';
import { Avatar, Box, Button, Flex, Heading, Link, Text } from "@radix-ui/themes";

export type CommentType = {
    parent_id: any;
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
    const maxDepth = 8;
    const effecTiveDepth = Math.min(depth, maxDepth);
    const indentSize = effecTiveDepth * 20;
    return (
        <Box
            style={{
                marginLeft: `${indentSize}px`,
                marginTop: '1rem',
                position: 'relative',
                width: `calc(100% - ${indentSize}px)`,
                minWidth: '650px',
            }}
        >

            {depth > 0 && (
                <Box
                    style={{
                        position: 'absolute',
                        left: '-10px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        backgroundColor: 'var(--gray-4)',
                    }}
                />
            )}

            <Flex gap="2" align="start">
                <Avatar
                    fallback={comment.username[0].toUpperCase()}
                    size={depth > 2 ? "1" : "2"}
                    radius="full"
                />

                <Box style={{ flex: 1 }}>
                    <Flex gap="2" align="center" mb="1">
                        <Text weight="bold" size={depth > 2 ? "1" : "2"}>{comment.username}</Text>
                        <Text size="1" color="gray">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </Text>
                    </Flex>

                    <Text as="p" size={depth > 2 ? "1" : "2"} mb="3" style={{ whiteSpace: "pre-wrap", lineHeight: 1.4 }}>
                        {comment.content}
                    </Text>
                    <Button size="1" variant="ghost" onClick={() => onReply(comment.id)}>
                        Reply
                    </Button>
                </Box>
            </Flex>

            {comment.replies && comment.replies.length > 0 && (
                <Box mt="2" style={
                    {
                        marginLeft: `${indentSize + 20}px`,
                        width: `calc(100% - ${indentSize + 20}px)`,
                        minWidth: '650px',
                    }
                }>
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            depth={depth + 1}
                            onReply={onReply}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}
