function limitName(name: string, limit: number, defaultValue: string = "") {
  if (!name) return defaultValue;

  const splitedName = name.split(" ");
  const isConective = splitedName[1]?.length <= 3;

  if (isConective) ++limit;

  const limitedName = splitedName.filter((_, i) => i <= limit - 1).join(" ");
  return limitedName;
}

export default limitName;
