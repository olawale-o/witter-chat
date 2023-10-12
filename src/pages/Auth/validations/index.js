
import { z } from 'zod';

const LoginSchema = z.object({
  username: z.union([z.string(), z.string().email()]),
  password: z
    .string()
    .min(6,)
    .max(10)
}).required({
    username: true,
    password: true
});

const SignUpSchema = z.object({
  username: z.string().min(2),
  password: z
    .string()
    .min(6)
    .max(10),
  email: z.string().email(),
  fullname: z.string().min(2)
}).required({
    username: true,
    password: true,
    fullname: true,
    email: true
});

export { LoginSchema, SignUpSchema };
