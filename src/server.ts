import express from "express";
import { eventRoutes } from "./routes/eventRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { locationRoutes } from "./routes/locationRoutes";

const app = express();

//TODO: Verificar se está bom assim
app.use(express.json());
app.use(eventRoutes);
app.use(categoryRoutes);
app.use(locationRoutes);

app.listen(process.env.PORT || 4003, () => console.log("Server is running on PORT 4003"));