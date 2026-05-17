import sharp from "sharp";

export async function preprocessOcrImage(
  buffer: Buffer
): Promise<Buffer> {

  return sharp(buffer)

    // enlarge small text FIRST
    .resize({
      width: 2200,
      fit: "inside",
      withoutEnlargement: false
    })

    // grayscale
    .grayscale()

    // improve contrast
    .normalize()

    // light sharpening
    .sharpen()

    // THEN threshold
    .threshold(110)

    // png
    .png()

    .toBuffer();
}