export const parseBoolean = (value) => {
  if (typeof value === 'string') {
    value = value.toLowerCase();
    return value === 'true' || value === '1'; // Consider '1' as true too
  }
  return !!value; // Handle other types, e.g., 0 becomes false, non-zero becomes true
}

export const buildNestedIncludeObject = (paths) => {
        const includeObject = {};
        let currentLevel = includeObject;

        for (let i = 0; i < paths.length; i++) {
            const pathPart = paths[i];
            if (i === paths.length - 1) {
                currentLevel[pathPart] = true; // Mark the deepest level for inclusion
            } else {
                currentLevel[pathPart] = { include: {} }; // Create nested include
                currentLevel = currentLevel[pathPart].include; // Move to the next level
            }
        }
        return includeObject;
}