import express from "express";
import path from "path";
import fs from "fs";
import resizeImage from "../../utilities/resize";

const router = express.Router();

router.get("/", async (req, res) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (!filename || !width || !height) {
    return res.status(400).send("Missing parameters");
  }

  const fullPath = path.resolve(`images/full/${filename}.jpg`);
  const thumbPath = path.resolve(
    `images/thumb/${filename}-${width}-${height}.jpg`
  );

  if (!fs.existsSync(fullPath)) {
    return res.status(404).send("Image not found");
  }

  if (!fs.existsSync(thumbPath)) {
    await resizeImage(fullPath, thumbPath, width, height);
  }

  res.sendFile(thumbPath);
});

export default router;
