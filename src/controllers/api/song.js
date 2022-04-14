/* eslint-disable no-restricted-syntax */
/**
 * Song API controller
 */

import typeorm from 'typeorm';
import { validationResult } from 'express-validator';
import { isAdmin, isEditor } from '../authorisation.js';

const { getConnection } = typeorm;

export const postSong = async (req, res, next) => {
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
      const repo = getConnection().getRepository('Song');

      // validate if the song already exists
      const song = await repo.findOne({
        where: { name: req.body.name, artist_id: req.body.artist_id },
        relations: ['artist_id'],
      });

      if (song) {
        req.formErrors = [{ message: 'song already exists for artist.' }];
        res.status(409).send('song already exists for artist.');
        return next();
      }

      // insert the song
      const insertedsong = await repo.save(req.body);

      // send a status code
      return res.status(200).json(insertedsong);
    }
    return res
      .status(405)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};

export const getSongs = async (req, res, next) => {
  try {
    // get the repository
    const repo = getConnection().getRepository('Song');

    // get all songs and return them with status code 200
    return res.status(200).json(await repo.find());
  } catch (e) {
    next(e.message);
  }
};

export const getSong = async (req, res, next) => {
  try {
    // get the id from params
    const { id } = req.params;

    // get the repository
    const repo = getConnection().getRepository('Song');

    // validate if the song exists
    const song = await repo.findOne({
      where: { id },
      relations: ['artist_id'],
    });

    if (!song) {
      req.formErrors = [{ message: `song with id: ${id} does not exist.` }];
      res.status(404).send('song does not exist.');
      return next();
    }

    // return the song with status code 200
    return res.status(200).json(song);
  } catch (e) {
    next(e.message);
  }
};

export const putSong = async (req, res, next) => {
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
      const repo = getConnection().getRepository('Song');

      // validate if the song exists
      const song = await repo.findOne({
        where: { id },
        relations: ['artist_id'],
      });

      if (!song) {
        req.formErrors = [{ message: `song with id: ${id} does not exist.` }];
        res.status(404).send('song does not exist.');
        return next();
      }

      // validate if another song by the same artist exists with the new name
      const othersong = await repo.findOne({
        where: { name: req.body.newSongName, artist_id: song.artist_id },
        relations: ['artist_id'],
      });

      if (othersong) {
        if (othersong.id !== song.id) {
          req.formErrors = [
            {
              message: `Another song with name ${req.body.newSongName} already exists for this artist.`,
            },
          ];
          res
            .status(409)
            .send(
              `Another song with name ${req.body.newSongName} already exists for this artist.`
            );
          return next();
        }
      }

      // update the song and send back status code 200
      return res.status(200).json(
        await repo.save({
          ...song,
          name: req.body.newSongName,
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

export const deleteSong = async (req, res, next) => {
  try {
    if (isAdmin) {
      // get the id from params
      const { id } = req.params;

      // get the repository
      const repo = getConnection().getRepository('Song');

      // validate if the song exists
      const song = await repo.findOne({ id });

      if (!song) {
        req.formErrors = [{ message: `song with id: ${id} does not exist.` }];
        res.status(404).send('song does not exist.');
        return next();
      }

      // get all playlists
      const playlistRepo = getConnection().getRepository('Playlist');
      const playlists = await playlistRepo.find({
        relations: ['songs', 'user_id'],
      });

      // remove song from all playlists
      for (const playlist of playlists) {
        for (const playlistSong of playlist.songs) {
          if (playlistSong.id === song.id) {
            playlist.songs.splice(playlist.songs.indexOf(playlistSong, 1));
            // eslint-disable-next-line no-await-in-loop
            await playlistRepo.save(playlist);
          }
        }
      }

      // get all albums
      const albumRepo = getConnection().getRepository('Album');
      const albums = await playlistRepo.find({
        relations: ['songs'],
      });

      // remove song from all albums
      for (const album of albums) {
        for (const albumSong of album.songs) {
          if (albumSong.id === song.id) {
            album.songs.splice(album.songs.indexOf(albumSong, 1));
            // eslint-disable-next-line no-await-in-loop
            await albumRepo.save(album);
          }
        }
      }

      await repo.remove(song);
      // remove the song and send back status code 200
      return res.status(200).json(await repo.remove(song));
    }
    return res
      .status(405)
      .send('You are not authorised to perform this action.');
  } catch (e) {
    next(e.message);
  }
};
