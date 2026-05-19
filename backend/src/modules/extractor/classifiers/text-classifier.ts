export function isTextObject(
  item: any
): boolean {

  return (
    typeof item?.str === "string" &&
    item.str.trim().length > 0
  );
}