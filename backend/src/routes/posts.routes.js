import { Router } from "express";
import { addPost, deletePost, getPosts, getPost, updatePost } from "../controllers/index.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/:postSlug', protect, addPost);
router.delete('/:postSlug', protect, deletePost);
router.get('/', getPosts);
router.get('/:postSlug', getPost);
router.put('/:postSlug', protect, updatePost);

export default router;