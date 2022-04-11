/**
 * Artist API controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;

export const postArtist = async (req, res, next) => {
  try {
    // get the repository
    const artistRepository = getConnection().getRepository('Artist');

    // FOR DEMO - insert the artist
    const insertedArtist = await artistRepository.save(req.body);

    // send a status code
    res.status(200).json(insertedArtist);
  } catch (e) {
    next(e.message);
  }
};

export const getArtists = async (req, res, next) => {
  try {
    // get the repository
    const artistRepository = getConnection().getRepository('Artist');

    // get all artists and return them with status code 200
    return res.status(200).json(await artistRepository.find());
  } catch (e) {
    next(e.message);
  }
};

// export const getArtist = async (req, res, next) => {
//   try {
//   } catch (e) {
//     next(e.message);
//   }
// };

export const putArtist = async (req, res, next) => {
  try {
  } catch (e) {
    next(e.message);
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
  } catch (e) {
    next(e.message);
  }
};
