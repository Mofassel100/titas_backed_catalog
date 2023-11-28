import { Schema, model } from 'mongoose';
import { ICategory, ITopCategory } from './category.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
export const CategorySchema = new Schema<ICategory>(
  {
    service: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    topCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'TopCategory',
    },
    userEmail: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    publishdate: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    wname: {
      type: String,
      required: true,
    },
    wdescription: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    topImage: {
      type: String,
      required: true,
    },
    wimage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const TopCategorySchema = new Schema<ITopCategory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    status: {
      type: Boolean,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

CategorySchema.pre('save', async function (next) {
  const isExist = await TopCategory.findOne({
    title: this.title,
  });
  if (!isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Title does not mached is already exist !',
    );
  }
  next();
});
TopCategorySchema.pre('save', async function (next) {
  const isExist = await TopCategory.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'TopCategory is already exist !');
  }
  next();
});

export const Category = model<ICategory>('category', CategorySchema);
export const TopCategory = model<ITopCategory>(
  'TopCategory',
  TopCategorySchema,
);
