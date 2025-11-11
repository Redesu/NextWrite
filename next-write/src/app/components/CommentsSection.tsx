import { getCommentsByPostSlug, postCommentToPostSlug } from "@/lib/comments";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { FormEvent, useEffect, useState } from "react";

export default function CommentsSection({
  postSlug,
  initialComments,
  user,
}: {
  postSlug?: string;
  initialComments?: any[];
  user?: any;
}) {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    setIsSubmitting(true);

    try {
      await postCommentToPostSlug(postSlug!, newComment);
      setError(null);

      const newComments = await getCommentsByPostSlug(postSlug!);
      setComments(newComments || []);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const latestComments = await getCommentsByPostSlug(postSlug!);
      setComments(latestComments || []);
    }, 30000);

    return () => clearInterval(interval);
  }, [postSlug]);

  return (
    <Box width="100%" maxWidth="700px" p="5" mt="6">
      <Card variant="classic" size="4">
        <Heading as="h2" size="6" mb="4" align="center">
          Comments ({comments.length})
        </Heading>
        {error && <span style={{ color: "red" }}>{error}</span>}
        {user && (
          <form onSubmit={handleSubmitComment}>
            <Flex direction="column" mb="4">
              <Flex gap="3" align="start">
                <Box flexGrow="1">
                  <TextArea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ minWidth: 80 }}
                    disabled={isSubmitting}
                  />
                </Box>
              </Flex>
              <Flex justify="end" mt="3">
                <Button
                  type="submit"
                  disabled={isSubmitting || newComment.trim() === ""}
                  style={{ cursor: "pointer" }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Comment"}
                </Button>
              </Flex>
            </Flex>
          </form>
        )}
        {!user && (
          <Text size="3" color="gray">
            You must be logged in to post comments.
          </Text>
        )}

        <Separator my="5" size="4" />
        <Flex direction="column" gap="5">
          {comments.map((comment) => (
            <Flex key={comment.id} gap="3">
              <Box flexGrow="1">
                <Flex justify="between" align="center">
                  <Text as="p" weight="bold" size="3">
                    {comment.author}
                  </Text>
                  <Text as="p" color="gray" size="2">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </Text>
                </Flex>
                <Text as="p" color="gray" size="3" mt="1">
                  {comment.content}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Card>
    </Box>
  );
}
