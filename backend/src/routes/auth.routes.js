import { Router } from 'express';
import { login, me, logout } from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, loginValidator, validate, login);
router.get('/me', protect, me);
router.post('/logout', protect, logout);

export default router;
