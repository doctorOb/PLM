/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, next) {

  // User is allowed, proceed to controller
  if (req.session.user && req.session.user.verified) {
    return next();
  }
  // User is not allowed
  else {
    return res.send("You are not permitted to perform this action.", 403);
  }
};