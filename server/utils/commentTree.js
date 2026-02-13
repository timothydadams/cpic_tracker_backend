/**
 * User fields returned for unauthenticated requests (comments, activities).
 */
export const PUBLIC_USER_SELECT = {
    id: true,
    username: true,
    profile_pic: true,
};

/**
 * Additional user fields returned for authenticated requests.
 */
export const AUTH_USER_SELECT = {
    ...PUBLIC_USER_SELECT,
    display_name: true,
    given_name: true,
    family_name: true,
    email: true,
};

/**
 * Returns the appropriate user select based on current auth state from ALS.
 */
export function getUserSelect(als) {
    const store = als.getStore();
    return store?.isAuthenticated ? AUTH_USER_SELECT : PUBLIC_USER_SELECT;
}

/**
 * Builds a nested comment tree from a flat array of comments.
 * Groups comments by parent_id and attaches children recursively.
 * Returns only root-level comments (parent_id === null) with their
 * nested children attached.
 *
 * @param {Array} comments - Flat array of comment objects, each with id and parent_id
 * @returns {Array} Root-level comments with nested children arrays
 */
export function buildCommentTree(comments) {
    const map = new Map();

    for (const comment of comments) {
        map.set(comment.id, { ...comment, children: [] });
    }

    const roots = [];

    for (const comment of comments) {
        const node = map.get(comment.id);
        if (comment.parent_id != null && map.has(comment.parent_id)) {
            map.get(comment.parent_id).children.push(node);
        } else {
            roots.push(node);
        }
    }

    return roots;
}
