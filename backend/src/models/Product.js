import mongoose from 'mongoose';
import slugify from 'slugify';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, trim: true, default: '' },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: { type: [imageSchema], default: [] },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    availability: { type: Boolean, default: true },
    sku: { type: String, unique: true },
  },
  { timestamps: true }
);

async function generateSku() {
  let sku;

  do {
    const uniquePart = new mongoose.Types.ObjectId()
      .toString()
      .slice(-8)
      .toUpperCase();
    sku = `RKH-${uniquePart}`;
    // eslint-disable-next-line no-await-in-loop
  } while (await mongoose.models.Product.exists({ sku }));

  return sku;
}

productSchema.pre('validate', async function () {
  if (this.name && (this.isNew || this.isModified('name'))) {
    const base = slugify(this.name, { lower: true, strict: true });
    let slug = base;
    let suffix = 1;
    // eslint-disable-next-line no-await-in-loop
    while (
      await mongoose.models.Product.exists({
        slug,
        _id: { $ne: this._id },
      })
    ) {
      slug = `${base}-${suffix++}`;
    }
    this.slug = slug;
  }
});

productSchema.pre('save', async function () {
  if (!this.sku) {
    this.sku = await generateSku();
  }
});

productSchema.index({ name: 'text', tags: 'text' });
productSchema.index({ category: 1 });

export default mongoose.model('Product', productSchema);
