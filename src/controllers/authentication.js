/**
 * A Register Controller
 */

import { getConnection } from 'typeorm';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = [
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorFields?.email ? req.formErrorFields.email : '',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorFields?.password ? req.formErrorFields.password : '',
    },
  ];

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorFields[param] = msg;
      });
      next();
    } else {
      // get the user repository
      const userRepository = getConnection().getRepository('User');

      // validate if the user already exists
      const user = await userRepository.findOne({
        where: { email: req.body.email },
      });

      if (user) {
        req.formErrors = [{ message: 'Gebruiker bestaat reeds.' }];
        return next();
      }

      // hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, 12);

      // get all roles from the roles repository
      // get the role repository
      const roleRepository = getConnection().getRepository('Role');

      // validate if the role exists
      const role = await roleRepository.findOne({
        where: { label: 'reader' },
      });

      // send an error if the role doesn't exists
      if (!role) {
        return next();
      }

      // create a new user
      const newUser = await userRepository.save({
        email: req.body.email,
        password: hashedPassword,
        role_id: role.id,
      });

      // create a webtoken
      const token = jwt.sign(
        { ...newUser, role_id: role },
        process.env.TOKEN_SALT,
        {
          expiresIn: '1h',
        }
      );

      // add the cookie in response
      res.cookie('token', token, { httpOnly: true });

      // redirect the user so he's logged in right away
      res.redirect('/');
    }
  } catch (e) {
    next(e.message);
  }
};

export const login = async (req, res) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = [
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorFields?.email ? req.formErrorFields.email : '',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorFields?.password ? req.formErrorFields.password : '',
    },
  ];

  // render the login page
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorFields[param] = msg;
      });
      next();
    } else {
      // get the user repository
      const userRepository = getConnection().getRepository('User');

      // validate if the user exists
      const user = await userRepository.findOne({
        where: { email: req.body.email },
        relations: ['role_id'],
      });
      // check if we found a user
      if (!user) {
        req.formErrors = [{ message: 'Gebruiker bestaat niet.' }];
        return next();
      }

      // decrypt the password
      const isEqual = bcrypt.compareSync(req.body.password, user.password);

      // check if incoming password is equal with the one in our database
      if (!isEqual) {
        req.formErrors = [{ message: 'Wachtwoord is onjuist.' }];
        return next();
      }

      // create a webtoken
      const token = jwt.sign({ ...user }, process.env.TOKEN_SALT, {
        expiresIn: '1h',
      });

      // add the cookie in response
      res.cookie('token', token, { httpOnly: true });

      // redirect to homepage
      res.redirect('/');
    }
  } catch (e) {
    next(e.message);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.redirect('/login');
  } catch (e) {
    next(e.message);
  }
};
