import { Router } from "express";
import { LocationsController } from "../controllers/locationController";

const locationRoutes = Router();
const locationsController = new LocationsController();

/*
Rotas com seus respectivos métodos HTTP para criar, listar, atualizar ou remover os locais dos eventos.
*/

locationRoutes.post("/location", locationsController.createLocation);
locationRoutes.get("/locations", locationsController.getLocations);
locationRoutes.get("/location/:id", locationsController.getLocationById);
locationRoutes.patch("/location/:id", locationsController.updateLocation);
locationRoutes.delete("/location/:id", locationsController.deleteLocation);


export { locationRoutes };