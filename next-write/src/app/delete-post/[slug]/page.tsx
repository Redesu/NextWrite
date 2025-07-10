"use client";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { deletePost } from "./actions";


export default function DeletePostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await deletePost(slug);
            if (result.success) {
                router.push("/");
            } else {
                setError("Failed to delete post. It may not exist.");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Content>
                <AlertDialog.Title>Delete Post Confirmation</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this post? This action cannot be undone.
                </AlertDialog.Description>
                {error && <Text color="red">{error}</Text>}
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" onClick={() => router.back()} disabled={loading}>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleDelete} disabled={loading}>
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

