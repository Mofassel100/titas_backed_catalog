import { boolean, string, z } from 'zod';
import { ENUM_USER_ROLE } from '../../../enums/user';

const createCategoryZodSchema = z.object({
  body: z.object({
    service: z.string({ required_error: 'Service is Required' }),
    userId: z.string({ required_error: 'UserId is Required' }),
    userEmail: z.string({ required_error: 'user Email is Required' }),
    status: z.boolean({ required_error: 'status is Required' }),
    designation: z.string({ required_error: 'designation is Required' }),
    publishdate: z.string({ required_error: 'publishdate is required' }),
    title: z.string({ required_error: 'title is Required' }),
    tname: z.string({
      required_error: 'titlename is required',
    }),
    description: z.string({ required_error: 'description is required' }),
    wname: z.string({
      required_error: 'writer name is required',
    }),
    wdescription: z.string({
      required_error: 'Writer description is required',
    }),
    image: z.string({ required_error: 'image is Required' }),
    topImage: z.string({ required_error: 'topImage is required' }),
    wimage: z.string({
      required_error: 'writer image is requred',
    }),
  }),
  userStatus: z
    .boolean({ required_error: 'user Status is optional' })
    .optional(),
});
const createTopCategoryZodSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'UserId is Required' }),
    status: z.boolean({ required_error: 'status is Required' }),
    designation: z.string({ required_error: 'designation is Required' }),
    title: z.string({ required_error: 'title is Required' }),
    tname: z.string({
      required_error: 'titlename is required',
    }),
    description: z.string({ required_error: 'description is required' }),
    wname: z.string({
      required_error: 'writer name is required',
    }),
    image: z.string({ required_error: 'image is Required' }),
  }),
  userStatus: z
    .boolean({ required_error: 'user Status is optional' })
    .optional(),
});

const UpdatedCategoryZodSchema = z.object({
  body: z.object({
    service: z.string({ required_error: 'Service is Required' }).optional(),
    userId: z.string({ required_error: 'UserId is Required' }).optional(),
    userEmail: z
      .string({ required_error: 'user Email is Required' })
      .optional(),
    status: z.boolean({ required_error: 'status is Required' }).optional(),
    designation: z
      .string({ required_error: 'designation is Required' })
      .optional(),
    publishdate: z
      .string({ required_error: 'publishdate is required' })
      .optional(),
    title: z.string({ required_error: 'title is Required' }).optional(),
    tname: z
      .string({
        required_error: 'titlename is required',
      })
      .optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    wname: z
      .string({
        required_error: 'writer name is required',
      })
      .optional(),

    wdescription: z
      .string({
        required_error: 'Writer description is required',
      })
      .optional(),
    image: z.string({ required_error: 'image is Required' }).optional(),
    topImage: z.string({ required_error: 'topImage is required' }).optional(),
    wimage: z
      .string({
        required_error: 'writer image is requred',
      })
      .optional(),
    userStatus: z
      .string({ required_error: 'user Status is optional' })
      .optional(),
  }),
});
const UpdatedTopCategoryZodSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'UserId is Required' }).optional(),
    status: z.boolean({ required_error: 'status is Required' }).optional(),
    topCategoryId: z.string({ required_error: 'TopCategory is ' }).optional(),
    designation: z
      .string({ required_error: 'designation is Required' })
      .optional(),
    title: z.string({ required_error: 'title is Required' }).optional(),
    tname: z
      .string({
        required_error: 'titlename is required',
      })
      .optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    wname: z
      .string({
        required_error: 'writer name is required',
      })
      .optional(),
    image: z.string({ required_error: 'image is Required' }).optional(),
  }),
});

export const CategoryValidation = {
  createCategoryZodSchema,
  UpdatedCategoryZodSchema,
  createTopCategoryZodSchema,
  UpdatedTopCategoryZodSchema,
};
