export const parseBoolean = (value) => {
  if (typeof value === 'string') {
    value = value.toLowerCase();
    return value === 'true' || value === '1'; // Consider '1' as true too
  }
  return !!value; // Handle other types, e.g., 0 becomes false, non-zero becomes true
}

export const buildNestedIncludeObject = (paths, maxDepth = Infinity) => {
        const includeObject = {};
        let currentLevel = includeObject;

        const effectivePaths = paths.slice(0, maxDepth);

        for (let i = 0; i < effectivePaths.length; i++) {
            const pathPart = effectivePaths[i];
            if (i === effectivePaths.length - 1) {
                currentLevel[pathPart] = true; // Mark the deepest level for inclusion
            } else {
                currentLevel[pathPart] = { include: {} }; // Create nested include
                currentLevel = currentLevel[pathPart].include; // Move to the next level
            }
        }
        return includeObject;
}