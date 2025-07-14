import { type CommentType } from "@/app/components/Comments";
export const buildCommentsTree = (
    flatComments: CommentType[],
): CommentType[] => {
    const commentMap: Record<string, CommentType> = {};
    const rootComments: CommentType[] = [];

    flatComments.forEach(comment => {
        commentMap[comment.id] = { ...comment, replies: [] };
    });

    flatComments.forEach(comment => {
        if (comment.parent_id) {
            const parent = commentMap[comment.parent_id];
            if (parent) {
                parent.replies = parent.replies || [];
                parent.replies.push(commentMap[comment.id]);
            }
        } else {
            rootComments.push(commentMap[comment.id]);
        }
    });

    return rootComments;
}