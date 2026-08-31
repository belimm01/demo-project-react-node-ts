import { Router, type Request, type Response } from "express";
import { AppDataSource } from "../data-source.js";
import { UserCredentialsEntity } from "../entity/userCredentialsEntity.js";

const router = Router();
const repository = () => AppDataSource.getRepository(UserCredentialsEntity);

router.post(
  "/api/user/credentials/save",
  async (req: Request, res: Response) => {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      res.status(400).json({ message: "email and password are required" });
      return;
    }

    const saved = await repository().save({ email, password });
    res.status(201).json(saved);
  },
);

router.get(
  "/api/user/credentials/all",
  async (_req: Request, res: Response) => {
    const users = await repository().find();
    res.json(users);
  },
);

export default router;
