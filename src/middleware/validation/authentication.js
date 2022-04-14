/**
 * The authentication validators
 */

import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .withMessage('E-mail is required.')
    .bail()
    .isEmail()
    .withMessage('E-mail is incorrect.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password should at least contain 6 characters.'),
];
