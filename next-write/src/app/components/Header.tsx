import { Box, Flex, Heading, Link } from "@radix-ui/themes";
import NextLink from "next/link";

export function Header() {
    return (
        <Box asChild py="4" px="5" style={{ borderBottom: "1px solid var(--gray-5" }}>
            <header>
                <Flex justify="between" align="center">
                    <NextLink href="/">
                        <Link asChild>
                            <Heading as="h1" size="4" weight="bold">
                                Next Write
                            </Heading>
                        </Link>
                    </NextLink>
                    <Flex gap="4">
                        <NextLink href="/">
                            <Link asChild>Home</Link>
                        </NextLink>
                        <NextLink href="/about">
                            <Link asChild>About</Link>
                        </NextLink>
                    </Flex>
                </Flex>
            </header>
        </Box>
    )
}