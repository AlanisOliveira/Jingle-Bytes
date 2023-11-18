import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";


//Método para criar uma nova categoria de eventos
async function createCategory(request: Request, response: Response) {
  try {
    const { name } = request.body;

    const category = await prismaClient.category.create({
      data: {
        name
      }
    });

    return response.status(201).json(category);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

// Método para listar todas as categorias registradas
async function getCategories(request: Request, response: Response) {
  try {

    const categories = await prismaClient.category.findMany();

    return response.status(200).json(categories);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

//Método para listar uma categoria usando o ID como parâmetro 
async function getCategoryById(request: Request, response: Response) {
  try {
    const { id } = request.params;

    //Verificando se a categoria está registrada 
    const categoryById = await prismaClient.category.findUnique({
      where: { id: id }
    });

    //Mensagem de erro para caso coloque o ID de uma categoria que não esteja registrada
    if (!categoryById) {
      return response.status(404).json({ error: "This category is not registered." })
    }

    return response.status(200).json(categoryById);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

//Método para atualizar o nome de uma categoria
async function updateCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const { name } = request.body;

    //Verificando se a categoria está registrada 
    const categoryExist = await prismaClient.category.findUnique({
      where: { id: id }
    });

    //Mensagem de erro para caso coloque o ID de uma categoria que não esteja registrada
    if (!categoryExist) {
      return response.status(404).json({ error: "This category is not registered." });
    }

    //Após a verificação o nome da categoria é atualizado
    const updateCategory = await prismaClient.category.update({
      where: {
        id: id
      },
      data: {
        name: name
      }
    });

    return response.status(200).json(updateCategory);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

//Método para remover uma categoria registrada
async function deleteCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;

    //Verificando se a categoria está registrada 
    const categoryExist = await prismaClient.category.findUnique({
      where: { id: id }
    });

    //Mensagem de erro para caso coloque o ID de uma categoria que não esteja registrada
    if (!categoryExist) {
      return response.status(404).json({ error: "This category is not registered." });
    }

    //Após a verificação a categoria é deletada
    const deleteCategory = await prismaClient.category.delete({
      where: { id: id }
    });

    return response.status(200).json(deleteCategory);
  } catch (error) {
    return response.status(500).json({ error: "An error occurred." });
  }
}

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}