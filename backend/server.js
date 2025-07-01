import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit'

import authRoutes from './src/routes/auth.routes.js';


const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
});
app.use(limiter);

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);

// health checking
app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong!' });
});

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// exporting app for later unit testing
export default app;
