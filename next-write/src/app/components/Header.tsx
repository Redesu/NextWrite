"use client";
import { Box, Button, Flex, Heading, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@radix-ui/themes";
import {
  ExitIcon,
  PlusIcon,
  HomeIcon,
  InfoCircledIcon,
  AvatarIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

export function Header() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <Box
        asChild
        py="4"
        px={{ initial: "3", sm: "5" }}
        style={{ borderBottom: "1px solid var(--gray-5)" }}
      >
        <Flex
          justify="between"
          align="center"
          gap={{ initial: "3", sm: "6" }}
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
      px={{ initial: "3", sm: "5" }}
      style={{ borderBottom: "1px solid var(--gray-5)" }}
    >
      <header>
        <Flex
          justify="between"
          align="center"
          gap={{ initial: "3", sm: "6" }}
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
          <Flex gap={{ initial: "3", sm: "4" }} align="center">
            <Link asChild>
              <NextLink href="/">
                <Flex align="center" gap={{ initial: "0", sm: "2" }}>
                  <HomeIcon width="16" height="16" />
                  <Box as="span" display={{ initial: "none", sm: "inline" }}>
                    <Text size="2">Home</Text>
                  </Box>
                </Flex>
              </NextLink>
            </Link>
            <Link asChild>
              <NextLink href="/about">
                <Flex align="center" gap={{ initial: "0", sm: "2" }}>
                  <InfoCircledIcon width="16" height="16" />
                  <Box as="span" display={{ initial: "none", sm: "inline" }}>
                    <Text size="2">About</Text>
                  </Box>
                </Flex>
              </NextLink>
            </Link>

            {!user && (
              <>
                <Link asChild>
                  <NextLink href="/login">
                    <Flex align="center" gap={{ initial: "0", sm: "2" }}>
                      <AvatarIcon width="16" height="16" />
                      <Box
                        as="span"
                        display={{ initial: "none", sm: "inline" }}
                      >
                        <Text size="2">Login</Text>
                      </Box>
                    </Flex>
                  </NextLink>
                </Link>
                <Link asChild>
                  <NextLink href="/register">
                    <Button size="2" variant="soft">
                      <PersonIcon width="16" height="16" />
                      <Box
                        as="span"
                        display={{ initial: "none", sm: "inline" }}
                        ml="2"
                      >
                        Create Account
                      </Box>
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
                      <Box
                        as="span"
                        display={{ initial: "none", sm: "inline" }}
                        ml="2"
                      >
                        Create Post
                      </Box>
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
                  <Box
                    as="span"
                    display={{ initial: "none", sm: "inline" }}
                    ml="2"
                  >
                    Logout
                  </Box>
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </header>
    </Box>
  );
}
