import express from "express";

import { ConsoleLogger } from "@/shared/logger/console-logger";

import { HeroController } from "./hero-controller";

const heroRouter = express.Router();

const logger = new ConsoleLogger();
const heroController = new HeroController({ logger });

heroRouter.get("/:id", heroController.run.bind(heroController));

export { heroRouter };
