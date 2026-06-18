import express, {
  type Request,
  type Response,
  type Router
} from "express";

import multer from "multer";

import {
  detectFileType
} from "@modules/detector";

import {
  extractObjects
} from "@modules/extractor";

import {
  analyzeObjects
} from "./analyzer.service";

const router: Router =
  express.Router();

const upload = multer({
  dest: "src/uploads/"
});

router.post(
  "/analyze",

  upload.single("file"),

  async (
    req: Request,
    res: Response
  ) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          error:
            "No file uploaded"
        });
      }

      const detectedFile =
        await detectFileType(
          req.file.path,
          req.file.mimetype
        );

      const extractedDocument =
        await extractObjects(
          detectedFile
        );

      const analyzedDocument =
        await analyzeObjects(
          extractedDocument
        );

      return res.status(200).json(
        analyzedDocument
      );

    } catch (error) {

      console.error(error);

      if (
        error instanceof Error
      ) {

        return res.status(400).json({
          error:
            error.message
        });
      }

      return res.status(500).json({
        error:
          "Internal server error"
      });
    }
  }
);

export default router;