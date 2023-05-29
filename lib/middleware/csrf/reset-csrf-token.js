const uuid = require('uuid');

module.exports = (req, res, next) => {
  const csrfToken = uuid.v4();
  const protocolHeader = req.headers['x-forwarded-proto'];
  const secure = protocolHeader ? protocolHeader.toLowerCase() === 'https' : false;

  res.cookie('csrfToken', csrfToken, {
    httpOnly: false,
    secure,
    sameSite: 'lax',
  });

  next();
};
