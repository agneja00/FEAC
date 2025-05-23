import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IUserPayload {
  id: string;
  iat: number;
  exp: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send({ error: "Not authenticated" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload;
    req.currentUser = payload;
  } catch (err) {
    res.status(401).send({ error: "Not authenticated" });
    return;
  }
  next();
};

export default authMiddleware;
