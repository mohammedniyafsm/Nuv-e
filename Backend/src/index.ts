import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import userRoute from "./routes/user";
import adminRoute from "./routes/admin";
import cors  from "cors"

const app = express();
connectDB();

app.use(express.json());
app.use('/api', userRoute);
app.use('/api', adminRoute);

const FRONTEND_URL = process.env.FRONTEND_URL;

const corsOption = {
    origin: FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};

app.use(cors(corsOption))

app.use('/', (req: Request, res: Response) => {
    res.send("Server Running....")
})

app.listen(process.env.PORT, () => {
    console.log(`Server Running at PORT ${process.env.PORT}`)
})