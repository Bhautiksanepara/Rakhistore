import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import Admin from '../models/Admin.js';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) throw new ApiError(401, 'Not authorized, no token');

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, 'Not authorized, invalid token');
  }

  const admin = await Admin.findById(decoded.id).select('-passwordHash');
  if (!admin) throw new ApiError(401, 'Not authorized, admin not found');

  req.admin = admin;
  next();
});
