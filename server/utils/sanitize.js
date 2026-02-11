/**
 * Returns a new object containing only the specified keys from the source object.
 * Used to prevent mass assignment by allowlisting fields before passing to Prisma.
 */
export const pick = (obj, keys) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k)));
