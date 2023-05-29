const uuid = require('uuid');

const comparisonUtils = require('../../utilities/comparison');
const statusCodes = require('../../constants/status-codes');

const statefulMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];

const isStatefulRequest = (req) => {
  const method = req.method.toUpperCase();

  return statefulMethods.includes(method);
};

const shouldTokensFailRequest = (tokenFromCookie, tokenFromHeader) => !tokenFromCookie
  || !tokenFromHeader
  || !comparisonUtils.isSafeEqual(tokenFromCookie, tokenFromHeader);

module.exports = (req, res, next) => {
  const { csrfToken } = req.cookies;
  const headerCsrfToken = req.headers['x-csrf-token'];

  if (isStatefulRequest(req) && shouldTokensFailRequest(csrfToken, headerCsrfToken)) {
    console.log('csrf token mismatch - block request');
    return res.status(statusCodes.FORBIDDEN).send();
  }

  const protocolHeader = req.headers['x-forwarded-proto'];
  const secure = protocolHeader ? protocolHeader.toLowerCase() === 'https' : false;

  res.cookie('csrfToken', csrfToken || uuid.v4(), {
    httpOnly: false,
    secure,
    sameSite: 'lax',
  });

  return next();
};
