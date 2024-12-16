import { before, after } from 'mocha'
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config({ path: '.env.test' });
/*
before(async function () {

    this.timeout(5000);
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });
  
  after(async function () {
   
    this.timeout(5000);
    await mongoose.connection.close();
  });*/