export function flattenObjects(objects: any[]): any[] {

  const result: any[] = [];

  function visit(object: any) {

    result.push(object);

    for (const child of getNestedObjects(object)) {

      visit(child);

    }

  }

  objects.forEach(visit);

  return result;

}

export function getNestedObjects(object: any) {

  const children: any[] = [];

  for (const value of Object.values(object)) {

    if (!Array.isArray(value))
      continue;

    for (const item of value) {

      if (item && typeof item === "object" && "id" in item) {

        children.push(item);

      }

    }

  }

  return children;

}