import "@radix-ui/themes/styles.css";
import { Theme, Card, Heading, Text, Link } from "@radix-ui/themes";
import { getSortedPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getSortedPosts();

  return (
    <Theme>
      <Heading as="h1" size="8" mb="5">
        Welcome to NextWrite!
      </Heading>
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {posts.map((post: any) => (
          <Card key={post.slug} variant="classic">
            <Link href={`/blog/${post.slug}`}>
              <Heading as="h2" size="5" mb="2">
                {post.title}
              </Heading>
            </Link>
            <Text as="p" mb="1">{post.description}</Text>
            <Text as="p" color="gray">{post.date}</Text>
          </Card>
        ))}
      </div>
    </Theme>
  );
}