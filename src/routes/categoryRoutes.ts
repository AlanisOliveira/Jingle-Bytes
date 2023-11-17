import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const categoryRoutes = Router();
const categoryController = new CategoryController();

/*
Rotas com seus respectivos métodos HTTP para criar, listar, atualizar ou remover categorias.
*/

categoryRoutes.post("/category", categoryController.createCategory);
categoryRoutes.get("/categories", categoryController.getCategories);
categoryRoutes.get("/category/:id", categoryController.getCategoryById);
categoryRoutes.put("/category/:id", categoryController.updateCategory);
categoryRoutes.delete("/category/:id", categoryController.deleteCategory);

export { categoryRoutes };