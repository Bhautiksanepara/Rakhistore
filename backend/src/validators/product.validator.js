import { body, param, query } from 'express-validator';

export const productQueryValidator = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('sort')
    .optional()
    .isIn(['price_asc', 'price_desc', 'newest', 'featured']),
  query('featured').optional().isBoolean().toBoolean(),
  query('newArrival').optional().isBoolean().toBoolean(),
  query('availability').optional().isBoolean().toBoolean(),
];

export const createProductValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').optional().trim(),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('originalPrice').optional().isFloat({ min: 0 }),
  body('category').isMongoId().withMessage('Valid category is required'),
  body('images').optional().isArray(),
  body('images.*.url').optional().isURL(),
  body('images.*.publicId').optional().isString(),
  body('tags').optional().isArray(),
  body('featured').optional().isBoolean().toBoolean(),
  body('newArrival').optional().isBoolean().toBoolean(),
  body('availability').optional().isBoolean().toBoolean(),
];

export const updateProductValidator = [
  param('id').isMongoId().withMessage('Invalid product id'),
  body('name').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('price').optional().isFloat({ min: 0 }),
  body('originalPrice').optional().isFloat({ min: 0 }),
  body('category').optional().isMongoId(),
  body('images').optional().isArray(),
  body('images.*.url').optional().isURL(),
  body('images.*.publicId').optional().isString(),
  body('tags').optional().isArray(),
  body('featured').optional().isBoolean().toBoolean(),
  body('newArrival').optional().isBoolean().toBoolean(),
  body('availability').optional().isBoolean().toBoolean(),
];

export const bulkDeleteValidator = [
  body('ids').isArray({ min: 1 }).withMessage('ids must be a non-empty array'),
  body('ids.*').isMongoId(),
];

export const idParamValidator = [
  param('id').isMongoId().withMessage('Invalid id'),
];
