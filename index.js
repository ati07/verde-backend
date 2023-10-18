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
import userRouter from './routes/user.js';
import dashboardRouter from './routes/dashboard.js';
import riskReportRouter from './routes/riskreport.js';
import apiRouter from './routes/api.js';
import invoiceRouter from './routes/invoice.js';

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
app.use('/dashboard',dashboardRouter)
app.use('/client', clientRouter);
app.use('/merchant', merchantRouter);
app.use('/merchant-account',merchantAccountRouter)
app.use('/rdr-alerts',rdrAlertsRouter)
app.use('/ethoca-alerts',ethocaAlertsRouter)
app.use('/chargebacks', chargebacksRouter);
app.use('/risk-report',riskReportRouter)
app.use('/auth', authRouter);
app.use('/user', userRouter);
// app.use('/api', apiRouter);
app.use('/invoice',invoiceRouter)



app.get('/live', (req, res) => res.json({ message: 'Message from server' }));

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT).then(() => console.log("db connected"));
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
