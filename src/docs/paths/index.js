import authentication from './Authentication.js';
import user from './User.js';
import artist from './Artist.js';
import song from './Song.js';
import album from './Album.js';

export default {
  ...authentication,
  ...user,
  ...artist,
  ...song,
  ...album,
};
