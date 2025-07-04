import { Box, Flex, Heading, Link } from "@radix-ui/themes";
import NextLink from "next/link";

export function Header() {
    return (
        <Box asChild py="4" px="5" style={{ borderBottom: "1px solid var(--gray-5)" }}>
            <header>
                <Flex justify="center" align="center" gap="6" maxWidth="1200px" mx="auto">
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
                        <Link asChild>
                            <NextLink href="/login">Login</NextLink>
                        </Link>
                        <Link asChild>
                            <NextLink href="/register">Register</NextLink>
                        </Link>
                    </Flex>
                </Flex>
            </header>
        </Box>
    )
}