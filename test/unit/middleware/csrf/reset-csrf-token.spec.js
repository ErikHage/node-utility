const uuid = require('uuid');

const resetCsrfToken = require('../../../../lib/middleware/csrf/reset-csrf-token');
const StubbedResponse = require('../../../helpers/stubbed-response');

jest.mock('uuid');

describe('Reset CSRF Token Middleware', () => {
  let req;
  let res;
  let next;

  const someUuid = 'some-uuid';

  beforeEach(() => {
    req = {};
    res = new StubbedResponse();
    next = jest.fn();
    uuid.v4.mockReturnValue(someUuid);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when there is no cookie', () => {
    it('sets the token in a cookie', () => {
      req = {
        headers: {},
        cookies: {},
      };

      resetCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', someUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
    });

    it('sets secure when https protocol', () => {
      req = {
        headers: {
          'x-forwarded-proto': 'https',
        },
        cookies: {},
      };

      resetCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', someUuid, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
    });
  });

  describe('when there is a cookie', () => {
    it('replaces the token in the cookie', () => {
      req = {
        headers: {},
        cookies: {
          csrfToken: 'some-old-csrf-token',
        },
      };

      resetCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', someUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
    });

    it('sets secure when https protocol', () => {
      req = {
        headers: {
          'x-forwarded-proto': 'https',
        },
        cookies: {
          csrfToken: 'some-old-csrf-token',
        },
      };

      resetCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', someUuid, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
    });
  });
});
