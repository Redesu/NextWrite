"use client";
import "@radix-ui/themes/styles.css";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Form } from "radix-ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { updatePost } from "./actions";

export default function EditPostClient({ post }: { post: any }) {
    const [title, setTitle] = useState(post?.title || '');
    const [description, setDescription] = useState(post.description);
    const [content, setContent] = useState(post.content);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    console.log("post slug: ", post.post.slug);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return; // this is to prevent multiple submissions
        setLoading(true);
        setError('');

        try {
            const result = await updatePost({ slug: post.post.slug, title, description, content });
            if (result.success) {
                router.push(`/blog/${result.slug}`);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } catch (err) {
            setError(err as string || 'An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!post) {
        return (
            <ProtectedRoute>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px'
                }}>
                    Loading...
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <Form.Root className="FormRoot" onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                gap: 16,
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                marginTop: '80px',
                padding: '32px',
                borderRadius: '12px',
                background: 'white',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            }} >
                {error && <p style={{ color: 'crimson', marginBottom: 16 }}>{error}</p>}

                <Form.Field name="title">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
                        <Form.Label style={{ marginRight: 4, fontWeight: 500, color: '#101211' }}>Title</Form.Label>
                        <Form.Control asChild>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                }}
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing" style={{ color: "crimson", fontSize: 13 }}>
                            Please write a title for your post
                        </Form.Message>
                    </div>
                </Form.Field>
                <Form.Field name="description">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Form.Label style={{ marginRight: 4, fontWeight: 500, color: '#101211' }}>Description</Form.Label>
                        <Form.Control asChild>
                            <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                }}
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing" style={{ color: "crimson", fontSize: 13 }}>
                            Please write a description for your post
                        </Form.Message>
                    </div>
                </Form.Field>

                <Form.Field name="content">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Form.Label style={{ marginRight: 4, fontWeight: 500, color: '#101211' }}>Content</Form.Label>
                        <Form.Control asChild>
                            <textarea
                                name="content"
                                rows={16}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    minWidth: '900px',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                }}
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing" style={{ color: "crimson", fontSize: 13 }}>
                            Please write the content of your post
                        </Form.Message>
                    </div>
                </Form.Field>
                <Form.Submit asChild>
                    <button type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '10px 0',
                            borderRadius: '6px',
                            border: 'none',
                            background: loading ? '#a5b4fc' : '#6366f1',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '12px',
                        }}
                    >{loading ? 'Updating Post...' : 'Update Post'}</button>
                </Form.Submit>
            </Form.Root>
        </ProtectedRoute >

    )
}