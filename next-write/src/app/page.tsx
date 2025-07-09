import "@radix-ui/themes/styles.css";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { getSortedPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getSortedPosts();

  return (
    <Box p="5" mx="auto" maxWidth="700px">
      <Heading as="h1" size="8" mb="6" align="center">
        Next Write
      </Heading>

      <Text as="p" size="4" mb="8" align="center" color="gray">
        Thoughts, ideas, and stories from the Next.js community
      </Text>

      <Flex direction="column" gap="6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
            <Box
              p="4"
              mb="2"
              style={{
                border: "1px solid var(--gray-5)",
                borderRadius: "12px",
                background: "var(--gray-1)",
                transition: "box-shadow 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                cursor: "pointer",
              }}
            >
              <Flex align="center" gap="4" mb="2">
                <Text size="2" color="gray">
                  {post.createdBy || "Anonymous"} • {new Date(post.date).toLocaleDateString()}
                </Text>
              </Flex>
              <Heading as="h2" size="5" mb="1" color="indigo">
                {post.title}
              </Heading>
              <Text size="3" color="gray">
                {post.description}
              </Text>
            </Box>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}