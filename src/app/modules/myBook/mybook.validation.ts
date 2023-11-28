import { z } from 'zod';
export const createMyBook = z.object({
  body: z.object({
    service: z.string({ required_error: 'service is required' }),
    userStatus: z.string({ required_error: 'userStatus is Required' }),
    userId: z.string({ required_error: 'userId is required' }),
    topCategoryId: z.string({ required_error: 'topCategoryId is required' }),
    userEmail: z.string({ required_error: 'userEmail is required' }),
    status: z.string({ required_error: 'status is required' }),
    designation: z.string({ required_error: 'designation is required' }),
    publishdate: z.string({ required_error: 'publishdate is required' }),
    title: z.string({ required_error: 'publishdate is required' }),
    tname: z.string({ required_error: 'tname is required' }),
    description: z.string({ required_error: 'description is required' }),
    wname: z.string({ required_error: 'wname is required' }),
    wdescription: z.string({ required_error: 'wdescription' }),
    image: z.string({ required_error: 'image is required' }),
    imageTitle: z.string({ required_error: 'imageTitle is required' }),
    imageDetails: z.string({ required_error: 'image Details is required' }),
    twoImage: z.string({ required_error: 'twoImage is required' }),
    twoImageTitle: z.string({ required_error: 'twoImageTitle is required' }),
    twoImageDetails: z.string({ required_error: 'twoImageDetails' }),
    topImage: z.string({ required_error: 'topImage is required' }),
    wimage: z.string({ required_error: 'wimage is required' }),
  }),
});
export const UpdatedMyBook = z.object({
  body: z.object({
    service: z.string({ required_error: 'service is required' }).optional(),
    userStatus: z
      .string({ required_error: 'userStatus is Required' })
      .optional(),
    userId: z.string({ required_error: 'userId is required' }).optional(),
    topCategoryId: z
      .string({ required_error: 'topCategoryId is required' })
      .optional(),
    userEmail: z.string({ required_error: 'userEmail is required' }).optional(),
    status: z.string({ required_error: 'status is required' }).optional(),
    designation: z
      .string({ required_error: 'designation is required' })
      .optional(),
    publishdate: z
      .string({ required_error: 'publishdate is required' })
      .optional(),
    title: z.string({ required_error: 'publishdate is required' }).optional(),
    tname: z.string({ required_error: 'tname is required' }).optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    wname: z.string({ required_error: 'wname is required' }).optional(),
    wdescription: z.string({ required_error: 'wdescription' }).optional(),
    image: z.string({ required_error: 'image is required' }).optional(),
    imageTitle: z
      .string({ required_error: 'imageTitle is required' })
      .optional(),
    imageDetails: z
      .string({ required_error: 'image Details is required' })
      .optional(),
    twoImage: z.string({ required_error: 'twoImage is required' }),
    twoImageTitle: z
      .string({ required_error: 'twoImageTitle is required' })
      .optional(),
    twoImageDetails: z.string({ required_error: 'twoImageDetails' }).optional(),
    topImage: z.string({ required_error: 'topImage is required' }).optional(),
    wimage: z.string({ required_error: 'wimage is required' }).optional(),
  }),
});

export const MyBookValidation = {
  createMyBook,
  UpdatedMyBook,
};
