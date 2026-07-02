import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true },
    description: { type: String, trim: true, default: '' },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

categorySchema.pre('validate', function () {
  if (this.name && (this.isNew || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

export default mongoose.model('Category', categorySchema);
