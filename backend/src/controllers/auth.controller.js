import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { generateToken } from '../utils/generateToken.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) throw new ApiError(401, 'Invalid email or password');

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password');

  const token = generateToken({ id: admin._id });
  res.cookie('token', token, cookieOptions);

  res.status(200).json(
    new ApiResponse(
      200,
      { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      'Login successful'
    )
  );
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.admin, 'Admin profile'));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.status(200).json(new ApiResponse(200, null, 'Logged out'));
});
