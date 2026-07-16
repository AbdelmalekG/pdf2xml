import express, { type Express } from "express";
import cors from "cors";

import detectorRoutes from "@modules/detector";
import extractorRoutes from "@modules/extractor";
import analyzerRoutes from "@modules/analyzer";
import mapperRoutes from "@modules/mapper";
import converterRoutes from "@modules/converter";

const app:Express = express();

app.use(cors());

app.use(express.json());

app.use("/api", detectorRoutes);
app.use("/api", extractorRoutes);
app.use("/api", analyzerRoutes);
app.use("/api", mapperRoutes);
app.use("/api", converterRoutes);

export default app;