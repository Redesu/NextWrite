"use client";
import "@radix-ui/themes/styles.css";
import { Form } from "radix-ui";
import { useAuth } from "@/context/AuthContext";
import { use, useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return; // this is to prevent multiple submissions
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setLoading(false);
      setPasswordMismatch(true);
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const { success, message } = await register(formData);
      if (!success) {
        setError("User or email already exists. Please try again.");
      }
    } catch (err) {
      setError(
        (err as string) ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root
      className="FormRoot"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        width: "320px",
        margin: "0 auto",
        marginTop: "80px",
        padding: "32px",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      }}
    >
      {error && <p style={{ color: "crimson", marginBottom: 16 }}>{error}</p>}

      <Form.Field name="username">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Form.Label
            style={{ marginRight: 4, fontWeight: 500, color: "#101211" }}
          >
            Username
          </Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              name="username"
              required
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </Form.Control>
          <Form.Message
            match="valueMissing"
            style={{ color: "crimson", fontSize: 13 }}
          >
            Please enter your username
          </Form.Message>
        </div>
      </Form.Field>
      <Form.Field name="email">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Form.Label
            style={{ marginRight: 4, fontWeight: 500, color: "#101211" }}
          >
            Email
          </Form.Label>
          <Form.Control asChild>
            <input
              type="email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </Form.Control>
          <Form.Message
            match="valueMissing"
            style={{ color: "crimson", fontSize: 13 }}
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            match="typeMismatch"
            style={{ color: "crimson", fontSize: 13 }}
          >
            Entered value is not a valid email
          </Form.Message>
        </div>
      </Form.Field>

      <Form.Field name="password">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Form.Label
            style={{ marginRight: 4, fontWeight: 500, color: "#101211" }}
          >
            Password
          </Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </Form.Control>
          <Form.Message
            match="valueMissing"
            style={{ color: "crimson", fontSize: 13 }}
          >
            Please enter your password
          </Form.Message>
        </div>
      </Form.Field>
      <Form.Field name="confirmPassword">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Form.Label
            style={{ marginRight: 4, fontWeight: 500, color: "#101211" }}
          >
            Confirm Password
          </Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </Form.Control>
          <Form.Message
            match="valueMissing"
            style={{ color: "crimson", fontSize: 13 }}
          >
            Please confirm your password
          </Form.Message>
          {passwordMismatch && (
            <Form.Message style={{ color: "crimson", fontSize: 13 }}>
              Passwords do not match
            </Form.Message>
          )}
        </div>
      </Form.Field>
      <Form.Field name="login">
        <div style={{ width: "100%", textAlign: "center", marginTop: 8 }}>
          <p style={{ color: "#6366f1", fontWeight: 500, fontSize: "14px" }}>
            {" "}
            Already have an account?
          </p>
          <Link
            href="/login"
            style={{
              color: "#6366f1",
              fontWeight: 500,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <b>Login here</b>
          </Link>
        </div>
      </Form.Field>
      <Form.Submit asChild>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: "6px",
            border: "none",
            background: loading ? "#a5b4fc" : "#6366f1",
            color: "white",
            fontWeight: 600,
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "12px",
          }}
        >
          {loading ? "Registering in..." : "Register"}
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
