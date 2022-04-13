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
    let roles;
    if (manage === 'users') {
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/users`
      );
      data = await response.json();

      // get all roles
      const roleRepo = getConnection().getRepository('Role');
      roles = await roleRepo.find();
    }

    // get all playlists
    const playlistRepo = getConnection().getRepository('Playlist');
    const playlists = await playlistRepo.find();

    // get all artists
    const artistRepo = getConnection().getRepository('Artist');
    const artists = await artistRepo.find();

    return res.render('home', { role, data, roles, playlists, artists });
  }
  // Gebruiker heeft geen geldige rol
  return null;
};
