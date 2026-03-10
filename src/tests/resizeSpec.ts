import resizeImage from "../utilities/resize";
import fs from "fs";

describe("Image Processing Function", () => {
  it("should resize the image", async () => {
    const input = "images/full/rose.jpg";
    const output = "images/thumb/test.jpg";

    await resizeImage(input, output, 100, 100);

    const exists = fs.existsSync(output);

    expect(exists).toBeTrue();
  });
});
