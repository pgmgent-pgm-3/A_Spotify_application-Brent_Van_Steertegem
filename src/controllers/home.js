/**
 * A Home Controller
 */

import fetch from 'node-fetch';
import { getConnection } from 'typeorm';

export const home = async (req, res) => {
  if (req.role === 'admin' || req.role === 'editor' || req.role === 'reader') {
    const { role } = req;
    const { manage } = req.query;
    let data;
    if (manage === 'users') {
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/users`
      );
      data = await response.json();
    }

    // get all playlists
    const playlistRepo = getConnection().getRepository('Playlist');
    const playlists = await playlistRepo.find();

    // get all artists
    const artistRepo = getConnection().getRepository('Artist');
    const artists = await artistRepo.find();

    return res.render('home', { role, data, playlists, artists });
  }
  // Gebruiker heeft geen geldige rol
  return null;
};
