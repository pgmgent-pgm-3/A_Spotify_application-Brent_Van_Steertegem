/**
 * A module with some custom block helpers
 */

export default {
  isEditor(role, options) {
    if (role === 'editor' || role === 'admin') {
      return options.fn();
    }
  },
  manage(manage, options) {
    return options.fn();
  },
  currentRole(currentRoleId, roleToCheckId, options) {
    if (currentRoleId === roleToCheckId) {
      return options.fn();
    }
  },
};
