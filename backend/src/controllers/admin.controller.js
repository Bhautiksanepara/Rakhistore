import Product from '../models/Product.js';
import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getStats = asyncHandler(async (req, res) => {
  const [totalProducts, featuredProducts, totalCategories, recentProducts] =
    await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ featured: true }),
      Category.countDocuments(),
      Product.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('category', 'name slug'),
    ]);

  res.status(200).json(
    new ApiResponse(200, {
      totalProducts,
      featuredProducts,
      totalCategories,
      recentProducts,
    })
  );
});
