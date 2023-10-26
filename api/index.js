import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import routerCurrency from './currency/router.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api', routerCurrency);

const start = () => {
  try {
    app.listen(PORT, async () => {
      const dbConnectionURL = `mongodb+srv://Luckyrok:${process.env.DB_PASS}@cluster0.0brdmgg.mongodb.net/?retryWrites=true&w=majority`;
      await connect(dbConnectionURL);
      console.log(`server started ${PORT}`);
    });
  } catch (e) {
    throw new Error(`server not started, ${e}}`);
  }
};

start();
