/* eslint-disable */

// todo see how to use this in this design

const uuid = require('uuid');

const utils = require('./utilities');

const secureFlag = typeof window !== 'undefined'
  && window.location
  && window.location.protocol === 'http:' ? '' : ';secure';

const fetchCsrfToken = () => {
  if (typeof window === 'object' && window.document) {
    let csrfToken = utils.getCookieValueFromCookies('csrfToken', window.document.cookie);
    if (!csrfToken) {
      csrfToken = uuid.v4();
      window.document.cookie = `csrfToken=${csrfToken}${secureFlag};path=/`;
    }

    return csrfToken;
  }

  return '';
};

module.exports = {
  fetchCsrfToken,
};
