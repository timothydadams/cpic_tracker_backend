import { Prisma } from '@prisma/client';
import { als } from './context.js';

const piiFields = {
  // Specify which fields to remove for each model
  User: ['email'],
  Implementer: ["emails", "phone_numbers"],
};

//build combined list of sensitive fields that will be checked in sanitize function
//called on query results for unauthenticated users
const allPiiFields = [].concat(...Object.values(piiFields));

//date check helper
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}

// Function to recursively remove sensitive fields from query results
function sanitizeData(data, sensitiveFields) {
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item, sensitiveFields));
  }

  if (isValidDate(data)) {
    return data
  }

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitizedData = { ...data };
  for (const key in sanitizedData) {
    if (sensitiveFields.includes(key)) {
      delete sanitizedData[key];
    } else if (typeof sanitizedData[key] === 'object') {
      sanitizedData[key] = sanitizeData(sanitizedData[key], sensitiveFields);
    }
  }
  return sanitizedData;
}

export const removePiiExtension = Prisma.defineExtension({
  name: 'pii-sanitizer-unauthed-users',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        // Assume you get the current user ID from a request context
        // Get the current user role from AsyncLocalStorage
        const store = als.getStore();

        console.log('prisma extended client details:', {store, model});
        
        // Skip extension ONLY if user is authed, since prisma nested includes won't
        // omit sensitive fields on models in the includes
        if (store?.isAuthenticated) {
            return query(args);
        }

        // Apply the `omit` option to remove PII fields from results (only impacts read ops)
        if (operation.startsWith('find') && piiFields[model]) {
          const omit = {};
          for (const field of piiFields[model]) {
            omit[field] = true;
          }
          args.omit = { ...args.omit, ...omit };
        }

        //we always need to call this to sanitize models inside of includes
        const res = await query(args);
        return sanitizeData(res, allPiiFields);
      },
    },
  },
});