import { body, param } from 'express-validator';

export const createCategoryValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').optional().trim(),
  body('image.url').optional().isURL(),
  body('image.publicId').optional().isString(),
];

export const updateCategoryValidator = [
  param('id').isMongoId().withMessage('Invalid category id'),
  body('name').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('image.url').optional().isURL(),
  body('image.publicId').optional().isString(),
];

export const idParamValidator = [
  param('id').isMongoId().withMessage('Invalid id'),
];
