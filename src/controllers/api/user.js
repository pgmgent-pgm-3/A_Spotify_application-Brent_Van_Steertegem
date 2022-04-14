/**
 * User API controller
 */

import typeorm from 'typeorm';
import { isAdmin } from '../authorisation.js';

const { getConnection } = typeorm;

export const postUser = async (req, res, next) => {
  try {
    // get the repository
    const repo = getConnection().getRepository('User');

    // insert the user
    const insertedUser = await repo.save(req.body);

    // send a status code
    res.status(200).json(insertedUser);
  } catch (e) {
    next(e.message);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    // check if the user's role is admin
    if (isAdmin(req)) {
      // get the repository
      const repo = getConnection().getRepository('User');

      // get all users and return them with status code 200
      return res.status(200).json(
        await repo.find({
          relations: ['user_meta_id', 'role_id'],
        })
      );
    }
    return res
      .status(403)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // check if the user's role is admin
    if (isAdmin(req)) {
      // catch the id from params
      const { id } = req.params;

      // validate incoming variables
      if (!id) throw new Error('Please specify an id to get');

      // get the repository
      const repo = getConnection().getRepository('User');

      // get the requested user
      const user = await repo.findOne({
        where: { id },
        relations: ['user_meta_id', 'role_id'],
      });

      // check if the user exist
      if (!user) throw new Error(`User with id: ${id} does not exist.`);

      // return the user with status code 200
      return res.status(200).json(user);
    }
    return res
      .status(403)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // check if the user's role is admin
    if (isAdmin(req)) {
      // catch the id from params
      const { id } = req.params;

      // validate incoming variables
      if (!id) throw new Error('Please specify an id to get');

      // get the repository
      const repo = getConnection().getRepository('User');

      // get the requested user
      const user = await repo.findOne({
        where: { id },
        relations: ['user_meta_id', 'role_id'],
      });

      // check if the user exist
      if (!user) throw new Error(`User with id: ${id} does not exist.`);

      // update the user to remove the user_meta_id
      const userMetaId = user.user_meta_id.id;
      await repo.save({
        ...user,
        user_meta_id: null,
      });

      // remove the user meta
      const userMetaRepo = getConnection().getRepository('UserMeta');

      const userMeta = await userMetaRepo.findOne({
        where: { id: userMetaId },
      });

      if (userMeta) await userMetaRepo.remove(userMeta);

      // remove the playlists
      const playlistRepo = getConnection().getRepository('Playlist');

      const playlists = await playlistRepo.find({
        where: { user_id: id },
        relations: ['user_id'],
      });

      if (playlists) {
        // eslint-disable-next-line no-restricted-syntax
        for (const playlist of playlists) {
          // eslint-disable-next-line no-await-in-loop
          await playlistRepo.remove(playlist);
        }
      }

      // return the user with status code 200
      return res.status(200).json(await repo.remove({ id }));
    }
    return res
      .status(403)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};
