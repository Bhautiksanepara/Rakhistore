import { Router } from 'express';
import {
  listProducts,
  getProductBySlug,
  getRelatedProducts,
} from '../controllers/product.controller.js';
import {
  productQueryValidator,
  idParamValidator,
} from '../validators/product.validator.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.get('/', productQueryValidator, validate, listProducts);
router.get('/:id/related', idParamValidator, validate, getRelatedProducts);
router.get('/:slug', getProductBySlug);

export default router;
