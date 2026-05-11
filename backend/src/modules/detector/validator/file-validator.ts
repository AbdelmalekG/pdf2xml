export function fileValidator(
  mimeType: string
): ".png" | ".jpg" | ".jpeg" | ".pdf" {

  switch (mimeType) {

    case "image/png":
      return ".png";

    case "image/jpeg":
      return ".jpeg";

    case "application/pdf":
      return ".pdf";

    default:
      throw new Error("Unsupported file type");
  }
}