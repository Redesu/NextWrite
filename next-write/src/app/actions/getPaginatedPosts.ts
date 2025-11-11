"use server";
import { getSortedPosts } from "@/lib/posts";

export async function getPaginatedPosts(offset = 0, limit = 10) {
  return getSortedPosts(offset, limit);
}
