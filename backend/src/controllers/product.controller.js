import Product from '../models/Product.js';
import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const SORT_MAP = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  newest: { createdAt: -1 },
  featured: { featured: -1, createdAt: -1 },
};

export const listProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    sort = 'newest',
    featured,
    newArrival,
    availability,
    page = 1,
    limit = 20,
  } = req.query;

  const filter = {};

  if (search) filter.$text = { $search: search };
  if (featured !== undefined) filter.featured = featured;
  if (newArrival !== undefined) filter.newArrival = newArrival;
  if (availability !== undefined) filter.availability = availability;

  if (category) {
    const cat = await Category.findOne({ slug: category });
    filter.category = cat ? cat._id : null;
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .sort(SORT_MAP[sort] || SORT_MAP.newest)
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit) || 1,
    })
  );
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate(
    'category',
    'name slug'
  );
  if (!product) throw new ApiError(404, 'Product not found');
  res.status(200).json(new ApiResponse(200, product));
});

export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(8)
    .populate('category', 'name slug');

  res.status(200).json(new ApiResponse(200, related));
});

export const createProduct = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) throw new ApiError(400, 'Category not found');

  const product = await Product.create(req.body);
  res.status(201).json(new ApiResponse(201, product, 'Product created'));
});

export const updateProduct = asyncHandler(async (req, res) => {
  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) throw new ApiError(400, 'Category not found');
  }

  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  Object.assign(product, req.body);
  await product.save();

  res.status(200).json(new ApiResponse(200, product, 'Product updated'));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');
  res.status(200).json(new ApiResponse(200, null, 'Product deleted'));
});

export const duplicateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  const clone = product.toObject();
  delete clone._id;
  delete clone.slug;
  delete clone.sku;
  delete clone.createdAt;
  delete clone.updatedAt;
  clone.name = `${clone.name} (Copy)`;

  const duplicate = await Product.create(clone);
  res.status(201).json(new ApiResponse(201, duplicate, 'Product duplicated'));
});

export const bulkDeleteProducts = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  const result = await Product.deleteMany({ _id: { $in: ids } });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCount: result.deletedCount },
        'Products deleted'
      )
    );
});
