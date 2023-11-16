import { Request, Response } from "express";

import { prismaClient } from "../database/prismaClient";

export class CreateLocationsController {
  async handle(request: Request, response: Response) {
    try {
      const { name, address } = request.body;

      const location = await prismaClient.locations.create({
        data: {
          name,
          address,
        },
      });

      return response.status(201).json(location);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
