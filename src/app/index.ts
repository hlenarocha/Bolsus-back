import dotenv from "dotenv";
import express from 'express';
import clientRouter from "../view/clientView";
import cors from 'cors';
import incomeRouter from "../view/incomeView";
import expenseRouter from "../view/expenseView";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(clientRouter);
app.use(incomeRouter);
app.use(expenseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 