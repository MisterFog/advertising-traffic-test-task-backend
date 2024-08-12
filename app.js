const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const peopleRoutes = require('./routes/people');

dotenv.config();

const app = express();

// Настройка CORS для разрешения запросов с любого домена
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware для парсинга JSON
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/people', peopleRoutes);

// Маршрут для проверки сервера
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;