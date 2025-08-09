import { z } from 'zod';

export const productFormSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    image: z
      .string()
      .nonempty('Image is required')
      .url('Image must be a valid URL'),
    rating: z
      .number({ error: 'Rating is required' })
      .min(1, 'Rating must be greater than or equal to 1')
      .max(5, 'Rating must be less than or equal to 5'),
    price: z
      .number({ error: 'Price is required' })
      .min(1, 'Price must be greater than or equal to 1'),
    description: z.string().nonempty('Description is required'),
    promotionalPrice: z
      .number({ error: 'Promotional Price must be a number' })
      .optional(),
  })
  .refine(
    (data) => !data.promotionalPrice || data.promotionalPrice < data.price,
    {
      message: 'Promotional price must be less than price',
      path: ['promotionalPrice'],
    }
  );

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerFormSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email'),
    birthday: z.date({
      error: 'Date is required',
    }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password must match',
    path: ['confirmPassword'],
  });

export const profileFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email'),
  birthday: z.date({
    error: 'Date is required',
  }),
  avatar: z.string().optional().nullable(),
});
