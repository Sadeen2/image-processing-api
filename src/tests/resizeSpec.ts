import resizeImage from "../utilities/resize";
import fs from 'fs';
import path from 'path';

describe("Image Processing Function", () => {
  const input = path.join(process.cwd(), "images/full/rose.jpg");
  const output = path.join(process.cwd(), "images/thumb/test-200-200.jpg");

  afterEach(() => {
    if (fs.existsSync(output)) {
      fs.unlinkSync(output);
    }
  });

  it("should resize image successfully", async () => {
    await resizeImage(input, output, 200, 200);

    expect(fs.existsSync(output)).toBeTrue();
  });

  it("should throw error when input image does not exist", async () => {
    const badInput = path.join(process.cwd(), "images/full/notfound.jpg");

    await expectAsync(resizeImage(badInput, output, 200, 200)).toBeRejected();
  });
});