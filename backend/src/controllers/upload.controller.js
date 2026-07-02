import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

function streamUpload(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'rakhi-store' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image file provided');

  const result = await streamUpload(req.file.buffer);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { url: result.secure_url, publicId: result.public_id },
        'Image uploaded'
      )
    );
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) throw new ApiError(400, 'publicId is required');

  await cloudinary.uploader.destroy(publicId);
  res.status(200).json(new ApiResponse(200, null, 'Image deleted'));
});
