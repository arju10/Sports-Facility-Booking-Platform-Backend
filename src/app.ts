import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import routes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Working successfully');
  // console.log(x)
});

// Global Error Handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);
export default app;
