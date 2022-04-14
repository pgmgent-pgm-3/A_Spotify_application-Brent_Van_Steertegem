/**
 * Album API controller
 */

import typeorm from 'typeorm';
import { validationResult } from 'express-validator';
import { isAdmin, isEditor } from '../authorisation.js';

const { getConnection } = typeorm;

export const postAlbum = async (req, res, next) => {
  try {
    // check if the user's role is admin
    if (isAdmin(req)) {
      // validate the incoming body
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.formErrorFields = {};

        errors.array().forEach(({ msg, param }) => {
          req.formErrorFields[param] = msg;
        });
        return next();
      }
      // get the repository
      const repo = getConnection().getRepository('Album');

      // validate if the album already exists
      const album = await repo.findOne({
        where: { name: req.body.name, artist_id: req.body.artist_id },
        relations: ['artist_id', 'songs'],
      });

      if (album) {
        req.formErrors = [{ message: 'album already exists for artist.' }];
        res.status(409).send('album already exists for artist.');
        return next();
      }

      // insert the album
      const insertedAlbum = await repo.save(req.body);

      // send a status code
      return res.status(200).json(insertedAlbum);
    }
    return res
      .status(405)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};

export const getAlbums = async (req, res, next) => {
  try {
    // get the repository
    const repo = getConnection().getRepository('Album');

    // get all albums and return them with status code 200
    return res.status(200).json(await repo.find());
  } catch (e) {
    next(e.message);
  }
};

export const getAlbum = async (req, res, next) => {
  try {
    // get the id from params
    const { id } = req.params;

    // get the repository
    const repo = getConnection().getRepository('Album');

    // validate if the album exists
    const album = await repo.findOne({
      where: { id },
      relations: ['artist_id', 'songs'],
    });

    if (!album) {
      req.formErrors = [{ message: `album with id: ${id} does not exist.` }];
      res.status(404).send('album does not exist.');
      return next();
    }

    // return the album with status code 200
    return res.status(200).json(album);
  } catch (e) {
    next(e.message);
  }
};

export const putAlbum = async (req, res, next) => {
  try {
    if (isEditor) {
      // validate the incoming body
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.formErrorFields = {};

        errors.array().forEach(({ msg, param }) => {
          req.formErrorFields[param] = msg;
        });
        return next();
      }

      // get the id from params
      const { id } = req.params;

      // get the repository
      const repo = getConnection().getRepository('Album');

      // validate if the album exists
      const album = await repo.findOne({
        where: { id },
        relations: ['artist_id', 'songs'],
      });

      if (!album) {
        req.formErrors = [{ message: `album with id: ${id} does not exist.` }];
        res.status(404).send('album does not exist.');
        return next();
      }

      // validate if another album by the same artist exists with the new name
      const otherAlbum = await repo.findOne({
        where: { name: req.body.newAlbumName, artist_id: album.artist_id },
        relations: ['artist_id', 'songs'],
      });

      if (otherAlbum) {
        if (otherAlbum.id !== album.id) {
          req.formErrors = [
            {
              message: `Another album with name ${req.body.newAlbumName} already exists for this artist.`,
            },
          ];
          res
            .status(409)
            .send(
              `Another album with name ${req.body.newAlbumName} already exists for this artist.`
            );
          return next();
        }
      }

      // update the album and send back status code 200
      return res.status(200).json(
        await repo.save({
          ...album,
          name: req.body.newAlbumName,
        })
      );
    }
    return res
      .status(405)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    if (isAdmin) {
      // get the id from params
      const { id } = req.params;

      // get the repository
      const repo = getConnection().getRepository('Album');

      // validate if the Album exists
      const Album = await repo.findOne({ id });

      if (!Album) {
        req.formErrors = [{ message: `Album with id: ${id} does not exist.` }];
        res.status(404).send('Album does not exist.');
        return next();
      }

      // remove the Album and send back status code 200
      // return res.status(200).json(await repo.remove(Album));
    }
    return res
      .status(405)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};
