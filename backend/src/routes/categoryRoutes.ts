import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController";

const categoryRoutes = Router();

/*
Rotas com seus respectivos métodos HTTP para criar, listar, atualizar ou remover categorias.
*/

categoryRoutes.post("/", createCategory);
categoryRoutes.get("/all", getCategories);
categoryRoutes.get("/unique/:id", getCategoryById);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

export { categoryRoutes };