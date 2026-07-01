export function isNumericText(
  text: string
): boolean {

  const normalized =
    text
      .trim()
      .replace(/\s/g, "")
      .replace(",", ".");

  if (normalized.length === 0) {
    return false;
  }

  const value =
    Number(normalized);

  return !Number.isNaN(value);

}