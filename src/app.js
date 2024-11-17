import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;


if (!MONGO_URI) {
  console.error('Error: MONGO_URI no está definido en el archivo .env');
  process.exit(1);
}

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message); 
    console.error(err); 
    process.exit(1);  
  });
