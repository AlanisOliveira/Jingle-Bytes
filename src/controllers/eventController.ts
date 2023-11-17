import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class EventsController {

  //Método para criar um novo evento
  async createEvent(request: Request, response: Response) {
    try {
      //TODO: Implementar restrição para apenas organizadores criarem evento
      const { name, date, description, categoryId, locationsId } = request.body;
      const event = await prismaClient.events.create({
        data: {
          name,
          date: new Date(date).toLocaleDateString(),
          description,
          categoryId,
          locationsId
        },
      });
      return response.status(201).json(event);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred" });
    }
  }

  //Método para listar todos os eventos registrados
  async getEvents(request: Request, response: Response) {
    try {
      const events = await prismaClient.events.findMany();

      return response.status(200).json(events);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

  //Método para listar um evento usando o ID como parâmetro
  async getEventById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const eventById = await prismaClient.events.findUnique({
        where: { id: parseInt(id) }
      });

      //Mensagem de erro para caso coloque o ID de um evento que não esteja registrado
      if (!eventById) {
        return response.status(404).json({ error: "This event is not registered." })
      }

      return response.status(200).json(eventById);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

  //Método para listar todos os eventos registrados
  async updateEvent(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, date, description, categoryId, locationsId } = request.body;

      //Verificando se o evento está registrado
      const eventById = await prismaClient.events.findUnique({
        where: { id: parseInt(id) }
      });

      //Mensagem de erro para caso coloque o ID de um evento que não esteja registrado
      if (!eventById) {
        return response.status(404).json({ error: "This event is not registered." })
      }

      //Após a verificação as informações do evento são atualizadas
      const updateEvent = await prismaClient.events.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name: name,
          date: date,
          description: description,
          categoryId: categoryId,
          locationsId: locationsId
        }
      });

      return response.status(200).json(updateEvent);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

  //Método para remover um evento registrado
  async deleteCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;

      //Verificando se o evento está registrado
      const eventExist = await prismaClient.events.findUnique({
        where: { id: parseInt(id) }
      });

      //Mensagem de erro para caso coloque o ID de um evento que não esteja registrado
      if (!eventExist) {
        return response.status(404).json({ error: "This event is not registered." });
      }

      //Após a verificação o evento é deletado
      const deleteEvent = await prismaClient.events.delete({
        where: { id: parseInt(id) }
      });

      return response.status(200).json(deleteEvent);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }
}
