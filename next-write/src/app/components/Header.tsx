'use client';
import { Box, Button, Flex, Heading, Link } from "@radix-ui/themes";
import NextLink from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@radix-ui/themes";
import { useEffect } from "react";

export function Header() {
    const { user, logout, loading } = useAuth();

    useEffect(() => {
    }, [user]);

    if (loading) {
        return (
            <Box asChild py="4" px="5" style={{ borderBottom: "1px solid var(--gray-5)" }}>
                <Flex justify="between" align="center" gap="6" maxWidth="1200px" mx="auto">
                    <Heading as="h1" size="4" weight="bold">
                        Next Write
                    </Heading>
                    <Spinner />
                </Flex>
            </Box>
        )
    }

    return (
        <Box asChild py="4" px="5" style={{ borderBottom: "1px solid var(--gray-5)" }}>
            <header>
                <Flex justify="between" align="center" gap="6" maxWidth="1200px" mx="auto">
                    <Link asChild>
                        <NextLink href="/">
                            <Heading as="h1" size="4" weight="bold">
                                Next Write
                            </Heading>
                        </NextLink>
                    </Link>
                    <Flex gap="4">
                        <Link asChild>
                            <NextLink href="/">Home</NextLink>
                        </Link>
                        <Link asChild>
                            <NextLink href="/about">About</NextLink>
                        </Link>

                        {!user && (
                            <>
                                <Link asChild>
                                    <NextLink href="/login">Login</NextLink>
                                </Link>
                                <Link asChild>
                                    <NextLink href="/register">Register</NextLink>
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Link asChild>
                                    <NextLink href="/create-post">Create Post</NextLink>
                                </Link>
                                <Button
                                    style={{ cursor: "pointer" }}
                                    variant="soft"
                                    color="red"
                                    onClick={async () => {
                                        await logout();
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}


                    </Flex>
                </Flex>
            </header>
        </Box>
    )
}