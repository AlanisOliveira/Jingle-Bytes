import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { parseDates, parseQueryParams } from "../helpers/filter_helpers";


//Método para criar um novo evento
async function createEvent(request: Request, response: Response) {
  try {
    //TODO: Implementar restrição para apenas organizadores criarem evento
    const { name, date, description, category_id, place_id } = request.body;
    const event = await prismaClient.event.create({
      data: {
        name,
        date: new Date(date),
        description,
        category_id,
        place_id,
      },
    });
    return response.status(201).json(event);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred" });
  }
}

//Método para listar todos os eventos registrados
async function getEvents(request: Request, response: Response) {
  try {
    const events = await prismaClient.event.findMany();

    return response.status(200).json(events);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

//Método para listar um evento usando o ID como parâmetro
async function getEventById(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const eventById = await prismaClient.event.findUnique({
      where: { id: id }
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
async function updateEvent(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const { name, date, description, category_id, place_id } = request.body;

    //Verificando se o evento está registrado
    const eventById = await prismaClient.event.findUnique({
      where: { id: id }
    });

    //Mensagem de erro para caso coloque o ID de um evento que não esteja registrado
    if (!eventById) {
      return response.status(404).json({ error: "This event is not registered." })
    }

    //Após a verificação as informações do evento são atualizadas
    const updateEvent = await prismaClient.event.update({
      where: {
        id: id
      },
      data: {
        name: name,
        date: date,
        description,
        category_id,
        place_id
      }
    });

    return response.status(200).json(updateEvent);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

const getEventDetail = async (req: Request, res: Response) => {
  try {
    const { event_id } = req.params;
    const event = await prismaClient.event.findFirst({
      where: {
        id: {
          equals: event_id
        }
      }, include: {
        category: {
          select: {
            name: true
          }
        },
        place: {
          select: {
            name: true,
            address: true,
            neighborhood: true,
            city: true,
            state: true,
            country: true,
          }
        }
      }
    })
    res.status(200).json({ event })

  } catch (error) {
    res.status(500).json({ error });
  }
}


//Método para remover um evento registrado
async function deleteEvent(request: Request, response: Response) {
  try {
    const { id } = request.params;

    //Verificando se o evento está registrado
    const eventExist = await prismaClient.event.findUnique({
      where: { id: id }
    });

    //Mensagem de erro para caso coloque o ID de um evento que não esteja registrado
    if (!eventExist) {
      return response.status(404).json({ error: "This event is not registered." });
    }

    //Após a verificação o evento é deletado
    const deleteEvent = await prismaClient.event.delete({
      where: { id: id }
    });

    return response.status(200).json(deleteEvent);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

const getEventsFiltered = async (req: Request, res: Response) => {
  try {
    const { search, categories, dates, places } = req.query;

    if (typeof search === "undefined" && typeof categories === "undefined" && typeof places === "undefined" && typeof dates === "undefined") {
      return res.status(400).json({ "status": "Any Filters Selected" })

    }

    const categoriesParsed = parseQueryParams(categories); // Transfer to a set
    const datesParsed = parseDates(parseQueryParams(dates));
    const placesParsed = parseQueryParams(places);
    const searchParsed = search as string | undefined

    if (typeof searchParsed === "undefined" && typeof categoriesParsed === "undefined" && typeof datesParsed === "undefined" && typeof placesParsed === "undefined") {
      return res.status(400).json({ "status": "Filters Invalid" })

    }

    const events = await prismaClient.event.findMany({
      where: {
        category_id: {
          in: categoriesParsed
        },
        place_id: {
          in: placesParsed
        },
        date: {
          gte: datesParsed[0],
          lte: datesParsed[1],

        },
        AND: {
          OR: [
            {
              name: {
                contains: searchParsed
              },
            },
            {

              description: {
                contains: searchParsed
              },
            }
          ]
        }

      }
    })
    res.status(200).json(events)

  } catch (error) {
    return res.status(500).json({ error: "An error occurred." });
  }
}


export {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsFiltered,
  getEventDetail
}