import express, { Request, Response } from 'express';
import userRouter from "./src/routes/userRouter";
import connectDB from './src/configs/db';
import {errorHandler} from "./src/middlewares/errorHandler";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use(errorHandler);

connectDB().then(()=>{
    console.log("connected successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;