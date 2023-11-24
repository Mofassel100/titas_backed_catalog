import { boolean, string, z } from 'zod';
import { bloodGroup, gender } from './user.constant';
import { ENUM_USER_ROLE } from '../../../enums/user';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First Name is Required' }),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'gernder is Required',
    }),
    dateOfBirth: z.string(),
    email: z.string({ required_error: 'Unicq Email is Required' }).email(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    postCode: z.string({ required_error: 'postCode is required' }),
    role: z.string(),

    emergencyPhoneNumber: z.number().optional(),
    phoneNumber: z.number().optional(),
    status: z.boolean().optional(),
    imageURL: z.string().optional(),
    currentAddress: string().optional(),
    permanentAddress: string().optional(),
  }),
});

const updatedUserSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    postCode: z.string().optional(),
    emergencyPhoneNumber: z.number().optional(),
    phoneNumber: z.number().optional(),
    status: z.boolean().optional(),
    imageURL: boolean().optional(),
    currentAddress: string().optional(),
    permanentAddress: string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updatedUserSchema,
};
