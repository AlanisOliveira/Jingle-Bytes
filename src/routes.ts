import { Router } from "express";
import { CreateEventsController } from "../controllers/CreateEventsController";
import { CreateCategoryController } from "../controllers/CreateCategoryController";
import { CreateLocationsController } from "../controllers/CreateLocationsController";

const router = Router();

const createEvents = new CreateEventsController();
const createCategory = new CreateCategoryController();
const createLocation = new CreateLocationsController();

router.post("/events", createEvents.handle);
router.post("/category", createCategory.handle);
router.post("/locations", createLocation.handle);

export { router };
