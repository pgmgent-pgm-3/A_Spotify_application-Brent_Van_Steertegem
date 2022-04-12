/**
 * User API controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;

export const postUser = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = getConnection().getRepository('User');

    // insert the user
    const insertedUser = await userRepository.save(req.body);

    // send a status code
    res.status(200).json(insertedUser);
  } catch (e) {
    next(e.message);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = getConnection().getRepository('User');

    // get all users and return them with status code 200
    return await userRepository.find();
    // return res.status(200).json(
    //   await userRepository.find({
    //     relations: ['user_meta', 'roles'],
    //   })
    // );
  } catch (e) {
    next(e.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
  } catch (e) {
    next(e.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
  } catch (e) {
    next(e.message);
  }
};
