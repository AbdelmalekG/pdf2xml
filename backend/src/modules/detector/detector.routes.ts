import express, { type Request, type Response, type Router } from "express";
import multer from "multer";

import { detectFileType } from "./detector.service";

const router:Router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});

router.post(
  "/detect",
  upload.single("file"),
  async (req: Request, res: Response) => {

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    const result = await detectFileType(
      req.file.path,
      req.file.mimetype
    );

    return res.json({
      detectedType: result
    });
  }
);

export default router;