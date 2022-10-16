import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import cors from 'cors';
import { router as medicalCardRouterV1 } from './v1/routes/medicalCardRouter';
import { errorLogger, errorResponder, invalidPath } from './v1/middlewares/customErrorMiddleware';
import { prismaErrorHandler } from './v1/middlewares/prismaErrorMiddleware';
import { router as bloodTestRouterV1 } from './v1/routes/bloodTestRouter';
import { router as bloodTestAnalyteRouterV1 } from './v1/routes/bloodTestAnalyteRouter';
import { router as genderRouterV1 } from './v1/routes/genderRouter';
import { router as bloodTestAnalyteDescriptionRouterV1 } from './v1/routes/btaDescriptionRouter';

const app = express();

//Initial Middleware
app.use(express.json());
app.use(cors());

//ROUTES V1
const prefixV1 = '/api/v1';
app.use(prefixV1, medicalCardRouterV1);
app.use(prefixV1, bloodTestRouterV1);
app.use(prefixV1, bloodTestAnalyteRouterV1);
app.use(prefixV1, genderRouterV1);
app.use(prefixV1, bloodTestAnalyteDescriptionRouterV1);

//Error Middleware
app.use('*', invalidPath);
app.use(prismaErrorHandler);
app.use(errorLogger);
app.use(errorResponder);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
