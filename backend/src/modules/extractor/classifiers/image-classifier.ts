export function isImageObject(
  item: any
): boolean {

  return (
    typeof item?.width === "number" &&
    typeof item?.height === "number" &&
    !!item?.base64data
  );
}