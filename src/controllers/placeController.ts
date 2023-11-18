import { Request, Response } from "express";

import { prismaClient } from "../database/prismaClient";


//Método para criar um novo local de eventos
async function createPlace(request: Request, response: Response) {
  try {
    const { name, address, neighborhood, city, state, country } = request.body;
    const place = await prismaClient.place.create({
      data: {
        name, address, neighborhood, city, state, country
      }
    }
    )
    return response.status(201).json(place);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

// Método para listar todos locais registrados
async function getPlaces(request: Request, response: Response) {
  try {
    const Places = await prismaClient.place.findMany();

    return response.status(200).json(Places);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

// Método para listar um local usando o ID como parâmetro
async function getPlaceById(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const placeById = await prismaClient.place.findUnique({
      where: {
        id: id
      },
    });

    // Verificando se o local está registrado
    if (!placeById) {
      return response.status(404).json({ error: "This Place is not registered." });
    }

    return response.status(200).json(placeById);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

//Método para atualizar o nome e endereço de um local registrado
async function updatePlace(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const { name, address, neighborhood, city, state, country } = request.body;

    //Verificando se o local já está registrado
    const placeExist = await prismaClient.place.findUnique({
      where: {
        id: id
      },
    });

    if (!placeExist) {
      return response.status(404).json({ error: "This Place is not registered." })
    }

    const updatePlace = await prismaClient.place.update({
      where: {
        id: id
      },
      data: {
        name, address, neighborhood, city, state, country
      }
    });

    return response.status(200).json(updatePlace);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

//Método para remover um local registrado
async function deletePlace(request: Request, response: Response) {
  try {
    const { id } = request.params;

    //Verificando se o local já está registrado
    const placeExist = await prismaClient.place.findUnique({
      where: {
        id: id
      },
    });

    if (!placeExist) {
      return response.status(404).json({ error: "This Place is not registered." })
    }

    const deletePlace = await prismaClient.place.delete({
      where: {
        id: id
      }
    });

    return response.status(200).json(deletePlace);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

export {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace
}