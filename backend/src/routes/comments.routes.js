import { Router } from 'express';
import { newComment, getComments } from '../controllers/index.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/:postSlug', protect, newComment);
router.get('/:postSlug', getComments);
export default router;