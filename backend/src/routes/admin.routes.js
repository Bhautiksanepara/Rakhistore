import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  duplicateProduct,
  bulkDeleteProducts,
} from '../controllers/product.controller.js';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { getStats } from '../controllers/admin.controller.js';
import { uploadImage, deleteImage } from '../controllers/upload.controller.js';
import {
  createProductValidator,
  updateProductValidator,
  idParamValidator as productIdValidator,
  bulkDeleteValidator,
} from '../validators/product.validator.js';
import {
  createCategoryValidator,
  updateCategoryValidator,
  idParamValidator as categoryIdValidator,
} from '../validators/category.validator.js';

const router = Router();

router.use(protect);

router.get('/stats', getStats);

router.post('/upload', upload.single('image'), uploadImage);
router.post('/upload/delete', deleteImage);

router.post('/products', createProductValidator, validate, createProduct);
router.put('/products/:id', updateProductValidator, validate, updateProduct);
router.delete('/products/:id', productIdValidator, validate, deleteProduct);
router.post(
  '/products/:id/duplicate',
  productIdValidator,
  validate,
  duplicateProduct
);
router.post(
  '/products/bulk-delete',
  bulkDeleteValidator,
  validate,
  bulkDeleteProducts
);

router.post('/categories', createCategoryValidator, validate, createCategory);
router.put(
  '/categories/:id',
  updateCategoryValidator,
  validate,
  updateCategory
);
router.delete(
  '/categories/:id',
  categoryIdValidator,
  validate,
  deleteCategory
);

export default router;
