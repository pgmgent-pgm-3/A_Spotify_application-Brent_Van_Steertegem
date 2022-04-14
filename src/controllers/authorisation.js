/**
 * A Authorisation Controller
 */

export const isAdmin = async (req) => {
  if (req.role === 'admin') {
    return true;
  }
};

export const isEditor = async (req) => {
  if (req.role === 'editor' || req.role === 'admin') {
    return true;
  }
};
