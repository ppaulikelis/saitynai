import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  res.send('Express + TypeScript Serversssssssss');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});