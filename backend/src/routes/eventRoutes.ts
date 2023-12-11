import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsFiltered,
  getEventDetail,
} from "../controllers/eventController";

const eventRoutes = Router();

/*
Rotas com seus respectivos métodos HTTP para criar, listar, atualizar ou remover eventos.
*/

eventRoutes.post("/", createEvent);
eventRoutes.get("/all", getEvents);
eventRoutes.get("/unique/:id", getEventById);
eventRoutes.get("/find", getEventsFiltered);
eventRoutes.patch("/:id", updateEvent);
eventRoutes.delete("/:id", deleteEvent);
eventRoutes.get("/details/:event_id", getEventDetail);

export { eventRoutes };