import sharp from "sharp";

const resizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(inputPath).resize(width, height).toFile(outputPath);
};

export default resizeImage;
