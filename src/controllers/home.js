/**
 * A Home Controller
 */

import { getUsers } from './api/user.js';

export const home = async (req, res) => {
  if (req.role === 'admin' || req.role === 'editor' || req.role === 'reader') {
    const { role } = req;
    const { manage } = req.query;
    let data;
    if (manage === 'users') {
      data = await getUsers();
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
