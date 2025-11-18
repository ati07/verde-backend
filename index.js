import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import apiRouter from './routes/api.js';
import morgan from 'morgan';
import uploadFileRouter from './routes/uploadFile.js';
import multer from 'multer';
import AdministratorRouter from './routes/administrator.js';
import ProviderRouter from './routes/provider.js';
import inventoryRouter from './routes/inventory.js';
import PaymentReportRouter from './routes/paymentReport.js';
import CollectionReportRouter from './routes/collectionReport.js';
import BankRouter from './routes/bank.js';
import CategoryInTheFlowRouter from './routes/categoryInTheFlow.js';
import CategoryProjectRouter from './routes/categoryProject.js';
import CodeRouter from './routes/code.js';
import ProjectRouter from './routes/project.js';
import clientRouter from './routes/client.js';
import StatusRouter from './routes/status.js';
import SubPhaseRouter from './routes/subPhase.js';
import TypeRouter from './routes/type.js';
import logRouter from './routes/log.js';
import RequestedByRouter from './routes/requestedBy.js';
import SellRouter from './routes/sell.js';
import repaymentAndDisbursementsRouter from './routes/repaymentAndDisbursements.js';
import profitabilityRouter from './routes/profitability.js';
import dashboardRouter from './routes/dashboard.js';
import ChatRouter from './routes/chat.js';

dotenv.config();

const port = process.env.PORT || 3000;


// Catch unexpected errors so you can see them in logs
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1); // Let PM2 restart the process
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});





const app = express();

app.use("/files", express.static("files"));

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
app.use(morgan('dev'));

app.use(express.json({ limit: '10mb' }));
// app.use('/dashboard',dashboardRouter)
app.use('/client', clientRouter);
app.use('/administrator', AdministratorRouter);
app.use('/bank', BankRouter);
app.use('/category_in_flow', CategoryInTheFlowRouter);
app.use('/category_project', CategoryProjectRouter);
app.use('/code', CodeRouter);
app.use('/project', ProjectRouter);
app.use('/status', StatusRouter);
app.use('/type', TypeRouter);
app.use('/sub_phase', SubPhaseRouter);
app.use('/provider', ProviderRouter);
app.use('/inventory',inventoryRouter)
app.use('/payment_report',PaymentReportRouter)
app.use('/collection_report',CollectionReportRouter)
app.use('/requestedBy',RequestedByRouter)
app.use('/sell',SellRouter)
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/api/logs', logRouter);
app.use('/repayment',repaymentAndDisbursementsRouter)
app.use("/profit",profitabilityRouter)
app.use('/api/dashboard', dashboardRouter);
app.use('/api/chats',ChatRouter)

app.use('/upload-file',uploadFileRouter)
app.get('/live', (req, res) => res.json({ message: 'Message from server' }));

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    console.log('Mongo DB conn. string...', process.env.MONGO_CONNECT);
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_CONNECT).then(() => console.log("db connected"));
    app
      .listen(port, () => console.log(`Server is listening on port: ${port}`))
      .on('error', (e) => {
        console.log('Error happened check: ', e.message);
      });
  } catch (error) {
    console.log(error);
  }
};


startServer();
