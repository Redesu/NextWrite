import { CommentType } from "@/app/components/Comments";

export const addReplyToComment = (
    currentComment: CommentType[],
    newComment: CommentType,
    parentId: string | null
): CommentType[] => {
    if (!parentId) {
        return [...currentComment, newComment];
    }
    return currentComment.map(comment => {
        if (comment.id === parentId) {
            return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
            };
        } else if (comment.replies && comment.replies.length > 0) {
            return {
                ...comment,
                replies: addReplyToComment(comment.replies || [], newComment, parentId),
            };
        }
        return comment;
    })
}


export const countAllComments = (comments: CommentType[]): number => {
    return comments.reduce((total, comment) => {
        total++;
        if (comment.replies && comment.replies.length > 0) {
            total += countAllComments(comment.replies);
        }
        return total;
    }, 0);
};
