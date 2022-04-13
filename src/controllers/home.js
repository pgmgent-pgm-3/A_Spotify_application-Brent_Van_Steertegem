/**
 * A Home Controller
 */

import fetch from 'node-fetch';

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
    const playlists = [
      'Heavy',
      "Rock 'n roll",
      'Fun',
      'Way too funny',
      'Hard Rock',
    ];
    const artists = [
      'Dream Widow',
      'Slipknot',
      'Rammstein',
      "Another Day's Armor",
      'Sick Puppies',
    ];
    return res.render('home', { role, data, playlists, artists });
  }
  // Gebruiker heeft geen geldige rol
  return null;
};
