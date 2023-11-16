import { Request, Response } from "express";

import { prismaClient } from "../database/prismaClient";

export class CreateEventsController {
  async handle(request: Request, response: Response) {
    try {
      const { name, date, description, categoryId, locationsId } = request.body;

      const event = await prismaClient.events.create({
        data: {
          name,
          date: new Date(),
          description,
          categoryId,
          locationsId,
        },
      });

      return response.status(201).json(event);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }
}
