export type RenderableObject =
  Record<string, unknown> & {
    id: string;
  };

export function isRenderableObject(
  value: unknown
): value is RenderableObject {

  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value
  );
}

export function getNestedObjects(
  object: Record<string, unknown>
): RenderableObject[] {

  const children: RenderableObject[] = [];

  for (
    const value
    of Object.values(object)
  ) {

    if (
      Array.isArray(value)
    ) {

      for (
        const item
        of value
      ) {

        if (
          isRenderableObject(item)
        ) {

          children.push(item);
        }
      }

      continue;
    }

    if (
      isRenderableObject(value)
    ) {

      children.push(value);
    }
  }

  return children;
}

export function getObjectName(
  id: string
) {

  return id.split("-")[0];
}

export function getObjectChildren(
  object: Record<string, unknown>
): RenderableObject[] {

  return getNestedObjects(
    object
  );
}