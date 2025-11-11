import "@radix-ui/themes/styles.css";
import { Box, Heading, Text, Link } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function About() {
  return (
    <Box p="5" mx="auto" maxWidth="700px">
      <Heading as="h1" size="8" mb="6" align="center">
        About Next Write
      </Heading>
      <Text as="p" size="4" mb="8" align="center" color="gray">
        Next Write is a place for the Next.js community to share their thoughts,
        ideas, and stories.
      </Text>
      <Text as="p" size="4" mb="8">
        This project is built with Next.js, Radix UI, and TypeScript. It
        features a simple blogging platform that allows users to create, edit,
        and delete posts.
      </Text>
      <Text as="p" size="4" mb="8">
        All pages are written in Markdown and live in the{" "}
        <code style={{ fontWeight: "bold", color: "red" }}>database</code>. The
        authentication logic is handled by the Express and postgres server in
        the <code style={{ fontWeight: "bold", color: "red" }}>backend</code>{" "}
        directory.
      </Text>
      <Text as="p" size="4" mb="8">
        The project is open source and available on{" "}
        <GitHubLogoIcon width="16" height="16" style={{ marginRight: "4px" }} />
        <Link
          href="https://github.com/Redesu/NextWrite"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        . Contributions are welcome!
      </Text>
    </Box>
  );
}
