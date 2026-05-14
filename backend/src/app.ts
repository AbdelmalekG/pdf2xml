import express, { type Express } from "express";
import cors from "cors";

import detectorRoutes from "@modules/detector";
import extractorRoutes from "@modules/extractor";
// import analyzerRoutes from "@modules/analyzer";

const app:Express = express();

app.use(cors());

app.use(express.json());

app.use("/api", detectorRoutes);
app.use("/api", extractorRoutes);
// app.use("/api", analyzerRoutes);
export default app;