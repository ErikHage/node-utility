module.exports = (req, res, next) => {
  res.clearCookie('csrfToken');
  next();
};
