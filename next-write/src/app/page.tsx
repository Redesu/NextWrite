import "@radix-ui/themes/styles.css";
import { Box, Heading, Text } from "@radix-ui/themes";
import PostListClient from "./PostListClient"

export default async function Home() {

  return (
    <Box p="5" mx="auto" maxWidth="700px">
      <Heading as="h1" size="8" mb="6" align="center">
        Next Write
      </Heading>
      <Text as="p" size="4" mb="8" align="center" color="gray">
        Thoughts, ideas, and stories from the Next.js community
      </Text>
      <PostListClient />
    </Box>
  );
}