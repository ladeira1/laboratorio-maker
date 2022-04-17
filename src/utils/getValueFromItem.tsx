export const getValueFromItem = (
  key: keyof Record<any, any>,
  item: Record<any, any>,
) => {
  const value = item[key];

  if (typeof value === 'string' || typeof value === 'number') return value;
  if (value && 'name' in value) return value.name;

  return null;
};
