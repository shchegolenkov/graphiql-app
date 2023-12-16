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
  email: 'Incorrect email! (e.g. example@yahoo.com)',
  password_uppercase: 'Must contain at least one uppercase letter!',
  password_lowercase: 'Must contain at least one lowercase letter!',
  password_digit: 'Must contain at least one digit!',
  password_specials: 'Must contain at least 1 special character!',
  password_length: 'Must be at least 8 characters long!',
};

export const schema = yup.object().shape({
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
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

export type SchemaType = yup.InferType<typeof schema>;
