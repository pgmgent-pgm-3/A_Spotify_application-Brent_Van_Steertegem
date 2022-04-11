/**
 * A Home Controller
 */

export const home = async (req, res) => {
  if (req.role === 'admin' || req.role === 'editor' || req.role === 'reader') {
    const { role } = req;
    const { manage } = req.query;
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
    return res.render('home', { role, manage, playlists, artists });
  }
  // Gebruiker heeft geen geldige rol
  return null;
};
