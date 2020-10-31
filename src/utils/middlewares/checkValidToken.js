const { verifyToken } = require('../auth.utils');

module.exports = (req, res, next) => {
  const { token } = req.headers;

  if (token) {
    verifyToken(token)
      .then(() => {
        next();
      })
      .catch((reason) => {
        res.status(403).send({
          message: reason,
        });
      });
  } else {
    res.sendStatus(401);
  }
};
