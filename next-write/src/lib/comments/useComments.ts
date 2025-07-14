import { useState, useEffect } from "react";
import axios from "axios";
import { CommentType } from "@/app/components/Comments";
import { buildCommentsTree } from "./buildCommentsTree";
import { addReplyToComment } from "./commentsUtils";


export const useComments = (postSlug: string, initialComments: CommentType[] = []) => {
    const [comments, setComments] = useState(initialComments);
    const [isLoading, setIsLoading] = useState(false);


    const loadComments = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postSlug}`, {
                withCredentials: true
            });

            const structuredComments = buildCommentsTree(response.data);
            setComments(structuredComments);
            return structuredComments;
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            setIsLoading(false);
        }
    }


    const handleSubmitComment = async (content: string, parent_id: string | null) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postSlug}`, {
                content,
                parent_id: parent_id || null
            }, {
                withCredentials: true
            });
            setComments((prevComments: CommentType[]) =>
                parent_id
                    ? addReplyToComment(prevComments, response.data, parent_id)
                    : [...prevComments, response.data]
            );
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    }


    useEffect(() => {
        loadComments();
    }, [postSlug]);

    return {
        comments,
        isLoading,
        loadComments,
        handleSubmitComment
    }

}