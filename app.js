import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import workflowRouter from './routes/workflow.routes.js'

const app = express();

app.use(express.json()); //built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: false })); //built-in middleware for parsing URL-encoded data
app.use(cookieParser()); //middleware for parsing cookies

app.use('/api/v0/auth', authRouter);
app.use('/api/v0/users', userRouter);
app.use('/api/v0/subscriptions', subscriptionRouter);
app.use('/api/v0/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello and Welcome to the Subscription Tracker API!',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/v0/auth',
      users: '/api/v0/users',
      subscriptions: '/api/v0/subscriptions',
      workflows: '/api/v0/workflows'
    },
    documentation: 'https://github.com/your-repo/subscription-tracker-api',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, async () => {
  console.log(`running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;