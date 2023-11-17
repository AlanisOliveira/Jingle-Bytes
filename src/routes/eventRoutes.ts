import { Router } from "express";
import { EventsController } from "../controllers/eventController";

const eventRoutes = Router();
const eventsController = new EventsController();

/*
Rotas com seus respectivos métodos HTTP para criar, listar, atualizar ou remover eventos.
*/

eventRoutes.post("/event", eventsController.createEvent);
eventRoutes.get("/events", eventsController.getEvents);
eventRoutes.get("/event/:id", eventsController.getEventById);
eventRoutes.patch("/event/:id", eventsController.updateEvent);
eventRoutes.delete("/event/:id", eventsController.updateEvent);

export { eventRoutes };