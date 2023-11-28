import { Schema, model } from 'mongoose';
import { ENUM_DESIGNATION } from '../../../enums/designation';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IMyBook } from './mybook.interface';
import {
  Category,
  CategorySchema,
  TopCategory,
} from '../categorys/category.model';
// const MyBookSchema = new Schema<IMyBook>(
//   {
//     service: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Users',
//     },
//     topCategoryId: {
//       type: Schema.Types.ObjectId,
//       ref: 'TopCategory',
//     },
//     userEmail: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: Boolean,
//       required: true,
//     },
//     designation: {
//       type: String,
//       enum: ENUM_DESIGNATION,
//     },
//     publishdate: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     tname: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     wname: {
//       type: String,
//       required: true,
//     },
//     wdescription: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     topImage: {
//       type: String,
//       required: true,
//     },
//     wimage: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

export const MyBookDetailsSchema = new Schema<IMyBook>(
  {
    publishdate: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    topCategoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    designation: {
      type: String,
      enum: ENUM_DESIGNATION,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageTitle: {
      type: String,
      required: true,
    },
    imageDetails: {
      type: String,
      required: true,
    },
    tname: {
      type: String,
      required: true,
    },
    topImage: {
      type: String,
      required: true,
    },
    userStatus: {
      type: String,
      required: true,
    },
    wdescription: {
      type: String,
      required: true,
    },
    wimage: {
      type: String,
      required: true,
    },
    wname: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    twoImage: {
      type: String,
      required: true,
    },
    twoImageTitle: {
      type: String,
      required: true,
    },
    twoImageDetails: {
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
      'Book Detaits title not matched is already exist !',
    );
  }
  next();
});

// export const MyBookModel = model<IMyBook>('MyBook', MyBookSchema);
export const MyBookModel = model<IMyBook>('category', MyBookDetailsSchema);
