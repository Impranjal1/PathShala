// import dotenv from 'dotenv';
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth.routes.js';
// import coachingRoutes from './routes/coaching.routes.js';
// import studentRoutes from './routes/student.routes.js';

// dotenv.config();

// const app = express();

// // Configure CORS
// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/coaching', coachingRoutes);
// app.use('/api/student', studentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
const app = express();

// Allow cross-origin requests from your frontend (localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Example route
app.post('/api/auth/update-user', (req, res) => {
  res.json({ message: 'User updated successfully' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
