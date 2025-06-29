import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
import 'dotenv/config';
import { ratelimit } from 'express-rate-limit';

const app = express();
const limiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
});
app.use(limiter);

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

app.use('/auth', authRoutes);

(async () => {
    try {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
})
