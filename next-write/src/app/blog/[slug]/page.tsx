import { getPostBySlug, getSortedPosts } from "@/lib/posts";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { Box, Card, Flex, Heading, Text, Theme } from "@radix-ui/themes";

export default async function BlogPost(props: { params: { slug: string } }) {
    const { params } = await props;
    const post = await getPostBySlug(params.slug);
    const contentHtml = await remark().use(remarkHtml).process(post.content);

    return (
        <Theme>
            <Flex justify="center" align="center" direction="column" minHeight="100vh">
                <Box width="100%" maxWidth="700px" p="5">
                    <Card variant="classic" size="4" style={{ overflow: "visible" }}>
                        <Heading as="h1" size="8" mb="4" align="center">
                            {post.title}
                        </Heading>
                        <Text as="p" size="3" color="gray" mb="6" align="center">
                            Published on: {post.date}
                        </Text>
                        <Box
                            asChild
                            mb="4"
                            style={{
                                lineHeight: 1.7,
                                fontSize: "1.1rem",
                                color: "var(--gray-12)",
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: contentHtml.toString() }} />
                        </Box>
                    </Card>
                </Box>
            </Flex>
        </Theme>
    );
}


export async function generateStaticParams() {
    const posts = await getSortedPosts();
    return posts.map((post: any) => ({ slug: post.slug }));
}