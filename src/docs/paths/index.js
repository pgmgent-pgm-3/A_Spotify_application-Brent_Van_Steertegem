import authentication from './Authentication.js';
import user from './user.js';
import artist from './artist.js';
import song from './song.js';

export default {
  ...authentication,
  ...user,
  ...artist,
  ...song,
};
