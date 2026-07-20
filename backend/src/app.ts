import express, { type Express } from "express";
import cors from "cors";

import detectorRoutes from "@modules/detector";
import extractorRoutes from "@modules/extractor";
import analyzerRoutes from "@modules/analyzer";
import mapperRoutes from "@modules/mapper";
import converterRoutes from "@modules/converter";

import pipelineRoutes from "./pipeline.routes";

const app:Express = express();

app.use(cors());

app.use(express.json());

// dev routes
app.use("/api/dev", detectorRoutes);
app.use("/api/dev", extractorRoutes);
app.use("/api/dev", analyzerRoutes);
app.use("/api/dev", mapperRoutes);
app.use("/api/dev", converterRoutes);

// prod routes
app.use("/api", pipelineRoutes);

export default app;