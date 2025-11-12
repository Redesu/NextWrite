import { Router } from "express";
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/index.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:postSlug", protect, addComment);
router.get("/:postSlug", getComments);
router.delete("/delete/:commentId", protect, deleteComment);
router.put("/update/:commentId", protect, updateComment);
export default router;
