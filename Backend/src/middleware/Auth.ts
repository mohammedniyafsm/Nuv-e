import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userProtect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwt_key = process.env.JWT_SECRET_KEY;
    if (!jwt_key) {
        throw new Error("JWT SECRET Not Found");
    }
    try {
        // const AuthHeader = req.headers.authorization;
        // if (!AuthHeader || !AuthHeader.startsWith("Bearer")) {
        //     res.status(401).json({ message: "Token Not Provided" });
        //     return;
        // }
        // const token = AuthHeader.split(" ")[1];
        const token = req.cookies.acess_token;
        if(!token){
            res.status(404).json({ message : "Token Not Found"});
            return;
        }
        const decoded = jwt.verify(token, jwt_key) as JwtPayload;
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
       
        req.user = {id : decoded.id,role : decoded.role};
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token", error });
    }
};

export const adminProtect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwt_key = process.env.JWT_SECRET_KEY;
    if (!jwt_key) {
        throw new Error("JWT SECRET Not Found");
    }
    try {
        // const AuthHeader = req.headers.authorization;
        // if (!AuthHeader || !AuthHeader.startsWith("Bearer")) {
        //     res.status(401).json({ message: "Token Not Provided" });
        //     return;
        // }

        // const token = AuthHeader.split(" ")[1];
        const token = req.cookies.acess_token;
        if(!token){
            res.status(404).json({ message : "Token Not Found"})
        }
        const decoded = jwt.verify(token, jwt_key) as JwtPayload;
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        req.admin = {id : decoded.id,role : decoded.role};
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token", error });
    }
};

export const protect = async(req:Request,res:Response,next:NextFunction) :Promise<void>=>{
    try {
        if(!req.admin || req.admin.role !== "admin"){
            res.status(401).json({message : "Unauthorised"});
            return ;
        }
        next();
    } catch (error) {
        res.status(500).json({message : "Server Error",error})
    }
}