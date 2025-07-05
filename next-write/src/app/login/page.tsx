'use client';
import "@radix-ui/themes/styles.css";
import { Form } from "radix-ui";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function LoginPage() {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading) return; // this is to prevent multiple submissions
        setLoading(true);
        setError('');

        try {
            const formData = new FormData(event.currentTarget);
            const { success, message } = await login(formData);
            if (!success) {
                setError(message);
            }
        } catch (err) {
            setError(err as string || 'An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form.Root className="FormRoot" onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            width: '320px',
            margin: '0 auto',
            marginTop: '80px',
            padding: '32px',
            borderRadius: '12px',
            background: 'white',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        }} >
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form.Field name="email">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Form.Label style={{ marginRight: 4, fontWeight: 500, color: '#101211' }}>Email</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="email"
                            name="email"
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
                        Please enter your email
                    </Form.Message>
                    <Form.Message match="typeMismatch" style={{ color: "crimson", fontSize: 13 }}>
                        Entered value is not a valid email
                    </Form.Message>
                </div>
            </Form.Field>

            <Form.Field name="password">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Form.Label style={{ marginRight: 4, fontWeight: 500, color: '#101211' }}>Password</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="password"
                            name="password"
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
                        Please enter your password
                    </Form.Message>
                </div>
            </Form.Field>
            <Form.Field name="rememberMe">
                <div style={{
                    display: 'flex', alignItems: 'center', gap:
                        8
                }}>
                    <Form.Control asChild>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            style={{
                                width: '16px',
                                height: '16px',
                                cursor: 'pointer',
                            }}
                        />
                    </Form.Control>
                    <Form.Label style={{ fontWeight: 500, color: '#101211' }}>Remember me</Form.Label>
                </div>
            </Form.Field>
            <Form.Field name="register">
                <div style={{ width: "100%", textAlign: "center", marginTop: 8 }}>
                    <p style={{ color: "#6366f1", fontWeight: 500, fontSize: "14px", }}> Don't have an account?</p>
                    <Link href="/register" style={{ color: "#6366f1", fontWeight: 500, fontSize: "14px", cursor: "pointer" }}>
                        <b>Register here</b>
                    </Link>
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
                    }}>{loading ? 'Logging in...' : 'Login'}</button>
            </Form.Submit>
        </Form.Root>
    );
}