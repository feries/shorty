/**
 * @name unless
 * @description Helper for skip middleware usage for a given routes
 * @usage app.use(unless(redirectPage, "/user/login", "/user/register"));
 * @param {Function} middleware - Middleware function to execute
 * @param {String} paths - N+1 path to exclude
 */

module.exports = (middleware, ...paths) => (req, res, next) => {
  const pathCheck = paths.some(path => path === req.path);
  pathCheck ? next() : middleware(req, res, next);
};
