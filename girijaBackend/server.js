require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const assistanceRoutes = require('./routes/assistance.routes');
const profilesRouter = require ('./routes/profile.router')

const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/assistance', assistanceRoutes);
// app.use('/api/profiles', profilesRouter);



// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});