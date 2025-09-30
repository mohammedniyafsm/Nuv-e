import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import userRoute from "./routes/user";


const app = express();
connectDB();

app.use(express.json())
app.use('/api', userRoute);

app.use('/', (req: Request, res: Response) => {
    res.send("Server Running....")
})

app.listen(process.env.PORT, () => {
    console.log(`Server Running at PORT ${process.env.PORT}`)
})