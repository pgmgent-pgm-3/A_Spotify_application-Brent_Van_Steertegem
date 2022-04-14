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
    let inputs;
    let formErrors;
    if (manage === 'users') {
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/users`,
        {
          headers: {
            cookie: `token=${req.cookies.token}`,
          },
        }
      );
      data = await response.json();

      // get all roles
      const roleRepo = getConnection().getRepository('Role');
      roles = await roleRepo.find();

      // errors
      formErrors = req.formErrors ? req.formErrors : [];

      // input fields
      inputs = [
        {
          name: 'email',
          label: 'E-mail',
          type: 'text',
          value: req.body?.email ? req.body.email : '',
          error: req.formErrorFields?.email ? req.formErrorFields.email : '',
        },
      ];
    }

    // get all playlists
    const playlistRepo = getConnection().getRepository('Playlist');
    const playlists = await playlistRepo.find();

    // get all artists
    const response = await fetch(
      `http://localhost:${process.env.PORT}/api/artists`,
      {
        headers: {
          cookie: `token=${req.cookies.token}`,
        },
      }
    );
    const artists = await response.json();

    return res.render('home', {
      role,
      manage,
      data,
      roles,
      inputs,
      formErrors,
      playlists,
      artists,
    });
  }
  // Gebruiker heeft geen geldige rol
  return null;
};
