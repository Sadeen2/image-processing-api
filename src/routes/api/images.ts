import express from "express";
import path from "path";
import fs from "fs";
import resizeImage from "../../utilities/resize";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    // check filename
    if (!filename) {
      return res.status(400).send("filename parameter is required");
    }

    // check width & height
    if (!width || !height || width <= 0 || height <= 0) {
      return res
        .status(400)
        .send("width and height must be positive numbers");
    }

    const fullPath = path.resolve(`images/full/${filename}.jpg`);
    const thumbPath = path.resolve(
      `images/thumb/${filename}-${width}-${height}.jpg`
    );

    // check image exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).send("Image not found");
    }

    // create resized image if not cached
    if (!fs.existsSync(thumbPath)) {
      await resizeImage(fullPath, thumbPath, width, height);
    }

    res.sendFile(thumbPath);
  } catch (error) {
    res.status(500).send("Error processing image");
  }
});

export default router;