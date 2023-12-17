/* eslint-disable react-refresh/only-export-components */
import * as yup from 'yup';

const RULES = {
  email: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  password_uppercase: /(?=.*[A-Z])/,
  password_lowercase: /(?=.*[a-z])/,
  password_digit: /\d/,
  password_specials: /(?=.*?[#?!@$%^&*-])/,
};

const MESSAGES = {
  required: 'Required field!',
  email: 'Incorrect email format!',
  password_uppercase: 'Add uppercase letters',
  password_lowercase: 'Add lowercase letters',
  password_digit: 'Please, add digits',
  password_specials: 'Add special characters',
  password_length: 'Password is too short!',
};

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required(MESSAGES.required)
    .email(MESSAGES.email)
    .matches(RULES.email, MESSAGES.email),
  password: yup
    .string()
    .required(MESSAGES.required)
    .matches(RULES.password_lowercase, {
      message: MESSAGES.password_lowercase,
    })
    .matches(RULES.password_uppercase, {
      message: MESSAGES.password_uppercase,
    })
    .matches(RULES.password_digit, {
      message: MESSAGES.password_digit,
    })
    .matches(RULES.password_specials, {
      message: MESSAGES.password_specials,
    })
    .min(8, MESSAGES.password_length),
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Passwords do not match.'),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required(MESSAGES.required)
    .email(MESSAGES.email)
    .matches(RULES.email, MESSAGES.email),
  password: yup.string(),
});

export type signupSchemaType = yup.InferType<typeof signupSchema>;
export type signinSchemaType = yup.InferType<typeof signinSchema>;
