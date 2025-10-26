import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import userRoute from "./routes/user";
import adminRoute from "./routes/admin";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());


// PRoduction and development setup
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL || "hhttps://d2bljxiphqwq8x.cloudfront.net/"
    :  "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use('/api', userRoute); // user Route
app.use('/api', adminRoute); //admin Route

app.use('/', (req: Request, res: Response) => {
    res.send("Server Running....")
})

app.listen(process.env.PORT, () => {
    console.log(`Server Running at PORT ${process.env.PORT}`)
})