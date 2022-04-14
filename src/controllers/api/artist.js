/**
 * Artist API controller
 */

import typeorm from 'typeorm';
import { validationResult } from 'express-validator';
import { isAdmin, isEditor } from '../authorisation.js';

const { getConnection } = typeorm;

export const postArtist = async (req, res, next) => {
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
      const repo = getConnection().getRepository('Artist');

      // validate if the artist already exists
      const artist = await repo.findOne({
        where: { name: req.body.name },
      });

      if (artist) {
        req.formErrors = [{ message: 'Artist already exists.' }];
        res.status(409).send('Artist already exists.');
        return next();
      }

      // insert the artist
      const insertedArtist = await repo.save(req.body);

      // send a status code
      return res.status(200).json(insertedArtist);
    }
    return res
      .status(403)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};

export const getArtists = async (req, res, next) => {
  try {
    // get the repository
    const repo = getConnection().getRepository('Artist');

    // get all artists and return them with status code 200
    return res.status(200).json(await repo.find());
  } catch (e) {
    next(e.message);
  }
};

export const putArtist = async (req, res, next) => {
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
      const repo = getConnection().getRepository('Artist');

      // validate if the artist exists
      const artist = await repo.findOne({ id });

      if (!artist) {
        req.formErrors = [{ message: `Artist with id: ${id} does not exist.` }];
        res.status(404).send('Artist does not exist.');
        return next();
      }

      // validate if another artist exists with the new name
      const otherArtist = await repo.findOne({
        where: { name: req.body.newArtistName },
      });

      if (otherArtist) {
        if (otherArtist.id !== artist.id) {
          req.formErrors = [
            {
              message: `Another artist with name ${req.body.newArtistName} already exists.`,
            },
          ];
          res
            .status(409)
            .send(
              `Another artist with name ${req.body.newArtistName} already exists.`
            );
          return next();
        }
      }

      // update the artist and send back status code 200
      return res.status(200).json(
        await repo.save({
          ...artist,
          name: req.body.newArtistName,
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

export const deleteArtist = async (req, res, next) => {
  try {
    if (isAdmin) {
      // get the id from params
      const { id } = req.params;

      // get the repository
      const repo = getConnection().getRepository('Artist');

      // validate if the artist exists
      const artist = await repo.findOne({ id });

      if (!artist) {
        req.formErrors = [{ message: `Artist with id: ${id} does not exist.` }];
        res.status(404).send('Artist does not exist.');
        return next();
      }

      // // remove all songs and albums from the artist
      // const albumRepo = getConnection().getRepository('Album');
      // const songRepo = getConnection().getRepository('Song');
      // const playlistRepo = getConnection().getRepository('Playlist');
      // const albums = await albumRepo.find({
      //   where: { artist_id: id },
      //   relations: ['artist_id', 'songs'],
      // });
      // if (albums) {
      //   for (const album of albums) {
      //     // remove all songs from the album and from the artist
      //     const { songs } = album;
      //     album.songs = null;
      //     if (songs) {
      //       for (const song of songs) {
      //         // remove song from all playlists
      //         const playlists = await playlistRepo.find({
      //           where: songs.includes(song),
      //           relations: ['songs', 'user_id'],
      //         });
      //         for (const playlist of playlists) {
      //           const songIndex = playlist.songs.indexOf(song);
      //           playlist.songs.splice(songIndex, 1);
      //           console.log(playlist);
      //           await playlistRepo.save(playlist);
      //         }
      //         await songRepo.remove(song);
      //       }
      //     }
      //     await albumRepo.remove(album);
      //   }
      // }

      // remove the artist and send back status code 200
      // return res.status(200).json(await repo.remove(artist));
    }
    return res
      .status(403)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};
