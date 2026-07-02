import { sanitize } from 'express-mongo-sanitize';

// express-mongo-sanitize's default middleware reassigns req.query, which
// Express 5 rejects (req.query is a read-only getter). sanitize() mutates
// the target object in place, so calling it without reassigning is safe.
export function mongoSanitize(req, res, next) {
  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);
  if (req.query) sanitize(req.query);
  next();
}
