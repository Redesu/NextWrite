import { Router } from 'express';
import { addComment, getComments } from '../controllers/index.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/:postSlug', protect, addComment);
router.get('/:postSlug', getComments);
export default router;