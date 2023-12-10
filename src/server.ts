import express from "express";
import { eventRoutes } from "./routes/eventRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { placeRoutes } from "./routes/placeRoutes";
import cors from 'cors';


const app = express();
const PORT = 42069;
app.use(cors());

app.use(express.json());
app.use("/event", eventRoutes);
app.use("/category", categoryRoutes);
app.use("/place", placeRoutes);

app.listen(process.env.PORT || PORT, () => console.log(`Server is running on PORT ${process.env.PORT || PORT}`))