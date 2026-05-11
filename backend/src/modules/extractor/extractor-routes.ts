import express, {
  type Request,
  type Response,
  type Router
} from "express";

import multer from "multer";

import {
  extractObjects
} from "@/modules/extractor";

const router: Router =
  express.Router();

const upload = multer({
  dest: "src/uploads/"
});

router.post(
  "/extract",

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

      const objects =
        await extractObjects(
          req.file.path,
          req.file.mimetype
        );

      return res.json({
        objects
      });

    } catch (error) {

      console.error(error);

      if (error instanceof Error) {

        return res.status(400).json({
          error: error.message
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