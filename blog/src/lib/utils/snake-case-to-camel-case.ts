type Entity = Record<string, unknown>;

export const convertSnakeCaseToCamelCase = <T extends Entity | Entity[] | null>(
  obj: T,
): T => {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    obj.forEach((el, index) => {
      obj[index] = convertSnakeCaseToCamelCase(el);
    });

    return obj;
  }

  Object.entries(obj).forEach(([key, value]) => {
    const camelCaseKey = key
      .split("_")
      .map((word, index) => {
        if (index === 0) {
          return word;
        }

        return word.slice(0, 1).toUpperCase() + word.slice(1);
      })
      .join("");

    delete obj[key];

    if (typeof value === "object") {
      obj[camelCaseKey] = convertSnakeCaseToCamelCase(value as Entity);
    } else {
      obj[camelCaseKey] = value;
    }
  });

  return obj;
};
