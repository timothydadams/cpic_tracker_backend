export const parseBoolean = (value) => {
  if (typeof value === 'string') {
    value = value.toLowerCase();
    return value === 'true' || value === '1'; // Consider '1' as true too
  }
  return !!value; // Handle other types, e.g., 0 becomes false, non-zero becomes true
}