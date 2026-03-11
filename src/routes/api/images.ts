import express from "express";
import path from "path";
import fs from "fs";
import resizeImage from "../../utilities/resize";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filename = req.query.filename as string;
    const widthStr = req.query.width as string;
    const heightStr = req.query.height as string;

    // check filename
    if (!filename) {
      return res.status(400).send("Missing filename parameter");
    }

    // check width & height parameters exist
    if (!widthStr || !heightStr) {
      return res.status(400).send("Missing width or height parameter");
    }

    const width = parseInt(widthStr);
    const height = parseInt(heightStr);

    // check valid numbers
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return res
        .status(400)
        .send("Invalid width or height values (must be positive numbers)");
    }

    const fullPath = path.resolve(`images/full/${filename}.jpg`);
    const thumbPath = path.resolve(
      `images/thumb/${filename}-${width}-${height}.jpg`
    );

    // check image exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).send("Image file does not exist");
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