/**
 * Middleware function that authenticates a user using a JWT stored in a cookie.
*
* @param {Object} req - The request object.
* @param {Object} res - The response object.
* @param {Function} next - The next middleware function.
* @return {undefined} This function does not return a value.
*/
const { jwt } = require('.././config/common');


exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, "API_JR_JUNE");
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    // return res.redirect("/");
  }
};