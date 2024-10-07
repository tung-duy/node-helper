import express, { Request, Response, NextFunction, Router } from "express";

const healthcheckRouter = Router();

/**
 * Healthcheck endpoint that returns uptime, message, timestamp, and instance info.
 */
healthcheckRouter.get("/healthz", async (_req: Request, res: Response, _next: NextFunction) => {
  const _healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    instances: process.env.NODE_APP_INSTANCE,
  };

  try {
    res.send(_healthcheck);
  } catch (error) {
    _healthcheck.message = String(error);
    res.status(503).send();
  }
});

export default (app: express.Application): void => {
  app.use(healthcheckRouter);
};
