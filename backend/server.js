import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import 'dotenv/config';

const app = express();

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
