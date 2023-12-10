import { Router } from "express";
import {
  createPlace,
  getPlaces,
  getPlaceById,
  updatePlace,
  deletePlace
} from "../controllers/placeController";

const placeRoutes = Router();

/*
Rotas com seus respectivos métodos HTTP para criar, listar, atualizar ou remover os locais dos eventos.
*/

placeRoutes.post("/", createPlace);
placeRoutes.get("/all", getPlaces);
placeRoutes.get("/unique/:id", getPlaceById);
placeRoutes.patch("/:id", updatePlace);
placeRoutes.delete("/:id", deletePlace);


export { placeRoutes };