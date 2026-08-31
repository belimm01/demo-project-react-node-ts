import "reflect-metadata";
import express from "express";
import cors from "cors";
import { env } from "./env.js";
import { AppDataSource } from "./data-source.js";
import userController from "./controller/userController.js";

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(userController);

  return app;
};

const bootstrap = async () => {
  await AppDataSource.initialize();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Server started at http://localhost:${env.port}`);
  });
};

bootstrap().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
