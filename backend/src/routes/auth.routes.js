import express from 'express';
import { Router } from 'express';
import { register, login, logout, refreshToken, getMe } from '../controllers/index.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/me', protect, getMe);

export default router;