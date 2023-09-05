import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import clientRouter from './routes/client.js';
import authRouter from './routes/auth.js';
import merchantRouter from './routes/merchant.js';
import chargebacksRouter from './routes/chargebacks.js';
import merchantAccountRouter from './routes/merchantAccount.js';
import ethocaAlertsRouter from './routes/ethocaAlerts.js';
import rdrAlertsRouter from './routes/rdrAlerts.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use('/client', clientRouter);
app.use('/merchant', merchantRouter);
app.use('/merchantAccount',merchantAccountRouter)
app.use('/rdrAlerts',rdrAlertsRouter)
app.use('/ethocaAlerts',ethocaAlertsRouter)
app.use('/chargebacks', chargebacksRouter);
app.use('/auth', authRouter);



app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
// app.get('/sendmail',sendMail)
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT).then(()=>console.log("db connected"));
    app
      .listen(port, () => console.log(`Server is listening on port: ${port}`))
      .on('error', (e) => {
        console.log('Error happened: ', e.message);
      });
  } catch (error) {
    console.log(error);
  }
};


startServer();
