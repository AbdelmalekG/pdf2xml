const IMAGE_OPERATORS = [
  85, // paintImageXObject
  88  // paintJpegXObject
];

export function isImageObject(
  operator: number
): boolean {

  return IMAGE_OPERATORS.includes(
    operator
  );
}