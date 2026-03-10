import resizeImage from "../utilities/resize";
import fs from "fs";

describe("Image Processing Function", () => {
  it("should resize image successfully", async () => {
    const input = "images/full/rose.jpg";
    const output = "images/thumb/test-200-200.jpg";

    await resizeImage(input, output, 200, 200);

    const exists = fs.existsSync(output);
    expect(exists).toBeTrue();
  });
});