const SKIP_FIELDS = new Set([
    "updatedAt",
    "createdAt",
    "id",
    //many-to-many relationship references
    "stakeholders",
    "comments",
    "implementers",
    "activities",
    //foreign keys to other tables (commented out so we can capture changes)
    //"focus_area",
    //"timeline",
    //"status",
    //"policy",
]);



/**
 * Computes a diff between the old and new state of a strategy,
 * returning only the fields that actually changed.
 *
 * @param {Object} oldData - The strategy record before the update
 * @param {Object} newData - The fields being updated (from req.body)
 * @returns {{ changes: Object, summary: string }}
 */
export function buildActivityChanges(oldData, newData) {
    const changes = {};
    const changedFields = [];

    for (const key of Object.keys(newData)) {
        if (SKIP_FIELDS.has(key)) continue;

        const oldVal = oldData[key] ?? null;
        const newVal = newData[key] ?? null;

        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
            changes[key] = { old: oldVal, new: newVal };
            changedFields.push(key);
        }
    }

    const summary =
        changedFields.length > 0
            ? `Updated ${changedFields.join(", ")}`
            : "No changes";

    return { changes, summary };
}

export function applyChanges(original, add, remove) {
    const removeSet = new Set(remove);
    return [...new Set([...original.filter(n => !removeSet.has(n)), ...add])];
}
