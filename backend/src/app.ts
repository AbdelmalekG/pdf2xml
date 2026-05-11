import express, { type Express } from "express";
import cors from "cors";

import detectorRoutes from "@/modules/detector";
import extractorRoutes from "@/modules/extractor";

const app:Express = express();

app.use(cors());

app.use(express.json());

app.use("/api", detectorRoutes);
app.use("/api", extractorRoutes);
export default app;