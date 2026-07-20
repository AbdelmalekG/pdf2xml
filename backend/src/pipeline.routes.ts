import express, {
  type Request,
  type Response,
  type Router
} from "express";

import multer from "multer";

import {
  pipeline
} from "./pipeline";

const router: Router =
  express.Router();

const upload =
  multer({
    dest: "src/uploads/"
  });

async function executePipeline(
  req: Request,
  res: Response
) {

  if (!req.file) {
    res.status(400).json({
      error: "No file uploaded"
    });

    return null;
  }

  try {
    return await pipeline(
      req.file.path,
      req.file.mimetype
    );
  }

  catch (error) {

    console.error(error);

    if (error instanceof Error) {
      res.status(400).json({
        error: error.message
      });
    }

    else {
      res.status(500).json({
        error: "Internal server error"
      });
    }
    return null;
  }
}


// POST /api/convert
router.post(
  "/convert",
  upload.single("file"),

  async (
    req: Request,
    res: Response
  ) => {

    const result =
      await executePipeline(
        req,
        res
      );

    if (!result) {
      return;
    }

    res
      .type("application/xml")
      .status(200)
      .send(result.converted);
  }
);

// POST /api/document
router.post(
  "/document",
  upload.single("file"),

  async (
    req: Request,
    res: Response
  ) => {

    const result =
      await executePipeline(
        req,
        res
      );

    if (!result) {
      return;
    }

    res
      .status(200)
      .json(result.analyzed);
  }
);

export default router;