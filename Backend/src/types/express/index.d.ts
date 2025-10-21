import { Request } from "express";

interface AuthUser {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
      admin: AuthUser;
    }
  }
}