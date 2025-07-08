import "@radix-ui/themes/styles.css";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { getSortedPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getSortedPosts();

  return (

    <Box p="5" mx="auto" maxWidth="800px">
      <Heading as="h1" size="8" mb="6" align="center">
        Next Write
      </Heading>

      <Text as="p" size="4" mb="8" align="center" color="gray">
        Thoughts, ideas, and stories from the Next.js community
      </Text>

      <Grid columns={{ initial: '1', md: '3', sm: '2' }} gap="6" align="stretch">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
            <Card variant="classic" size="3" style={{ height: '100%' }}>
              <Flex direction="column" gap="3" style={{ height: '100%' }}>
                <Heading as="h2" size="5" mb="2">
                  {post.title}
                </Heading>
                <Text size="3" color="gray">
                  {post.description}
                </Text>
                <Text size="2" color="gray">
                  Published on: {new Date(post.date).toLocaleDateString()}
                </Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Grid>
    </Box>

  );
}