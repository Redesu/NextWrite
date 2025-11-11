"use client";
import { Box, Button, Flex, Heading, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@radix-ui/themes";
import { useEffect } from "react";
import {
  ExitIcon,
  PlusIcon,
  HomeIcon,
  InfoCircledIcon,
  AvatarIcon,
} from "@radix-ui/react-icons";

export function Header() {
  const { user, logout, loading } = useAuth();

  useEffect(() => {}, [user]);

  if (loading) {
    return (
      <Box
        asChild
        py="4"
        px="5"
        style={{ borderBottom: "1px solid var(--gray-5)" }}
      >
        <Flex
          justify="between"
          align="center"
          gap="6"
          maxWidth="1200px"
          mx="auto"
        >
          <Heading as="h1" size="4" weight="bold">
            Next Write
          </Heading>
          <Spinner />
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      asChild
      py="4"
      px="5"
      style={{ borderBottom: "1px solid var(--gray-5)" }}
    >
      <header>
        <Flex
          justify="between"
          align="center"
          gap="6"
          maxWidth="1200px"
          mx="auto"
        >
          <Link asChild>
            <NextLink href="/">
              <Heading as="h1" size="4" weight="bold">
                Next Write
              </Heading>
            </NextLink>
          </Link>
          <Flex gap="4" align="center">
            <Link asChild>
              <NextLink href="/">
                <Flex align="center" gap="2">
                  <HomeIcon width="16" height="16" />
                  <Text size="2">Home</Text>
                </Flex>
              </NextLink>
            </Link>
            <Link asChild>
              <NextLink href="/about">
                <Flex align="center" gap="2">
                  <InfoCircledIcon width="16" height="16" />
                  <Text size="2">About</Text>
                </Flex>
              </NextLink>
            </Link>

            {!user && (
              <>
                <Link asChild>
                  <NextLink href="/login">
                    <Flex align="center" gap="2">
                      <AvatarIcon width="16" height="16" />
                      <Text size="2">Login</Text>
                    </Flex>
                  </NextLink>
                </Link>
                <Link asChild>
                  <NextLink href="/register">
                    <Button size="2" variant="soft">
                      Create Account
                    </Button>
                  </NextLink>
                </Link>
              </>
            )}

            {user && (
              <>
                <Link asChild>
                  <NextLink href="/create-post">
                    <Button size="2" variant="soft">
                      <PlusIcon width="16" height="16" />
                      <Text as="span" ml="2">
                        Create Post
                      </Text>
                    </Button>
                  </NextLink>
                </Link>
                <Button
                  size="2"
                  variant="soft"
                  color="red"
                  onClick={async () => {
                    await logout();
                  }}
                >
                  <ExitIcon width="16" height="16" />
                  <Text as="span" ml="2">
                    Logout
                  </Text>
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </header>
    </Box>
  );
}
