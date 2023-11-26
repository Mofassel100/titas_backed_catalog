import { z } from 'zod';

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
  UpdatedCategoryZodSchema,
  UpdatedTopCategoryZodSchema,
};
