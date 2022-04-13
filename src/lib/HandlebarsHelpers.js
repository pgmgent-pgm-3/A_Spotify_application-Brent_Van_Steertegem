/**
 * A module with some custom block helpers
 */

export default {
  isEditor(role, options) {
    if (role === 'editor' || role === 'admin') {
      return options.fn();
    }
  },
  manageType(manage, type, options) {
    if (manage === type) {
      return options.fn();
    }
  },
  currentRole(currentRoleId, roleToCheckId, options) {
    if (currentRoleId === roleToCheckId) {
      return options.fn();
    }
  },
};
