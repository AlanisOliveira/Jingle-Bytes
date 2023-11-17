import { Request, Response } from "express";

import { prismaClient } from "../database/prismaClient";

export class LocationsController {

  //Método para criar um novo local de eventos
  async createLocation(request: Request, response: Response) {
    try {
      const { name, address } = request.body;

      //Verificando se o local já foi registrado
      const existingLocation = await prismaClient.locations.findFirst({ where: { name, address } });

      if (existingLocation) {
        return response.status(400).json({ error: "This location already exists." });
      }

      // Após a verificação o local é registrado
      const location = await prismaClient.locations.create({
        data: {
          name, 
          address 
        }
      });

      return response.status(201).json(location);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

  // Método para listar todos locais registrados
  async getLocations(request: Request, response: Response) {
    try {
      const locations = await prismaClient.locations.findMany();

      return response.status(200).json(locations);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

  // Método para listar um local usando o ID como parâmetro
  async getLocationById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const locationById = await prismaClient.locations.findUnique({
        where: {
          id: parseInt(id)
        },
      });

      // Verificando se o local está registrado
      if (!locationById) {
        return response.status(404).json({ error: "This location is not registered." });
      }

      return response.status(200).json(locationById);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

  //Método para atualizar o nome e endereço de um local registrado
  async updateLocation(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, address } = request.body;

      //Verificando se o local já está registrado
      const locationExist = await prismaClient.locations.findUnique({
        where: {
          id: parseInt(id)
        },
      });

      if (!locationExist) {
        return response.status(404).json({ error: "This location is not registered." })
      }

      const updateLocation = await prismaClient.locations.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name: name,
          address: address
        }
      });

      return response.status(200).json(updateLocation);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

  //Método para remover um local registrado
  async deleteLocation(request: Request, response: Response) {
    try {
      const { id } = request.params;

      //Verificando se o local já está registrado
      const locationExist = await prismaClient.locations.findUnique({
        where: {
          id: parseInt(id)
        },
      });

      if (!locationExist) {
        return response.status(404).json({ error: "This location is not registered." })
      }

      const deleteLocation = await prismaClient.locations.delete({
        where: {
          id: parseInt(id)
        }
      });

      return response.status(200).json(deleteLocation);
    } catch (error) {
      return response.status(500).json({ error: "An error occurred." });
    }
  }

}
