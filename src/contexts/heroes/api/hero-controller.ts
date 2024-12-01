import axios from "axios";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Logger } from "@/shared/logger/logger";

interface Hero {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface HeroResponse {
  fullName: string;
  size: "tall" | "average" | "short";
  weight: "heavy" | "light";
  hairColor: string;
}

function calculateSize(height: number): "tall" | "average" | "short" {
  if (height > 200) {
    return "tall";
  }

  if (height < 100) {
    return "short";
  }

  return "average";
}

function calculateWeight(weight: number): "heavy" | "light" {
  if (weight > 100) {
    return "heavy";
  }

  return "light";
}

export class HeroController {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  private async getHero(id: string): Promise<HeroResponse> {
    const hero = (await axios.get(
      `https://swapi.dev/api/people/${id}`,
    )) as unknown as { data: Hero };
    this.logger.info("Hero", { hero: hero.data });

    return {
      fullName: hero.data.name,
      size: calculateSize(Number.parseInt(hero.data.height, 10)),
      weight: calculateWeight(Number.parseInt(hero.data.mass, 10)),
      hairColor: hero.data.hair_color,
    };
  }

  async run(req: Request, res: Response) {
    const id = req.params.id;
    this.logger.info("Received request to get hero", { id });

    const heroResponse = await this.getHero(id);
    res.status(StatusCodes.OK).send(heroResponse);
  }
}
