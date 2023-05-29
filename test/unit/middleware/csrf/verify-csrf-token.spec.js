const uuid = require('uuid');
jest.mock('uuid');

const verifyCsrfToken = require('../../../../lib/middleware/csrf/verify-csrf-token');
const StubbedResponse = require('../../../helpers/stubbed-response');

describe('Verify CSRF Token Middleware', () => {
  let req;
  let res;
  let next;

  const csrfTokenUuid = 'the-csrf-token';

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {},
    };
    res = new StubbedResponse();
    next = jest.fn();
    uuid.v4.mockReturnValue(csrfTokenUuid);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('adds token and does not fail when there is no csrf token on the req', () => {
      req.method = 'GET';

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).toHaveBeenCalled();
    });

    it('keeps the token from the cookie and does not fail when there is a csrf token on the req.cookies', () => {
      req.method = 'GET';
      req.cookies.csrfToken = 'the-old-csrf-token';

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', 'the-old-csrf-token', {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).not.toHaveBeenCalled();
    });

    it('keeps the token from the cookie and does not fail when the csrf tokens do not match', () => {
      req.method = 'GET';
      req.cookies.csrfToken = csrfTokenUuid;
      req.headers['x-csrf-token'] = 'other-csrf-token';

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).not.toHaveBeenCalled();
    });

    it('keeps the token from the cookie and does not fail when the csrf tokens match', () => {
      req.method = 'GET';
      req.cookies.csrfToken = csrfTokenUuid;
      req.headers['x-csrf-token'] = csrfTokenUuid;

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).not.toHaveBeenCalled();
    });

    it('the token is secure when the request comes over ssl', () => {
      req.method = 'GET';
      req.headers['x-forwarded-proto'] = 'https';

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).toHaveBeenCalled();
    });
  });

  describe('protected methods', () => {
    ['POST', 'PUT', 'DELETE', 'PATCH'].forEach(method => {
      describe(method, () => {
        it('fails without adding the token when there is no csrf token on the req', () => {
          req.method = method;

          verifyCsrfToken(req, res, next);

          expect(res.status).toHaveBeenCalledWith(403);
          expect(res.send).toHaveBeenCalled();
          expect(res.cookie).not.toHaveBeenCalled();
          expect(next).not.toHaveBeenCalled();
          expect(uuid.v4).not.toHaveBeenCalled();
        });

        it('does not touch the cookies and fails when the only csrf token is in req.cookies', () => {
          req.method = method;
          req.cookies.csrfToken = csrfTokenUuid;

          verifyCsrfToken(req, res, next);

          expect(res.status).toHaveBeenCalledWith(403);
          expect(res.send).toHaveBeenCalled();
          expect(res.cookie).not.toHaveBeenCalled();
          expect(next).not.toHaveBeenCalled();
          expect(uuid.v4).not.toHaveBeenCalled();
        });

        it('does not touch the cookies and fails when the only csrf token is in req.headers', () => {
          req.method = method;
          req.headers['x-csrf-token'] = csrfTokenUuid;

          verifyCsrfToken(req, res, next);

          expect(res.status).toHaveBeenCalledWith(403);
          expect(res.send).toHaveBeenCalled();
          expect(res.cookie).not.toHaveBeenCalled();
          expect(next).not.toHaveBeenCalled();
          expect(uuid.v4).not.toHaveBeenCalled();
        });

        it('keeps the token from the cookie and fails when the csrf tokens do not match', () => {
          req.method = method;
          req.headers['x-csrf-token'] = csrfTokenUuid;
          req.cookies.csrfToken = 'some-other-csrf-token';

          verifyCsrfToken(req, res, next);

          expect(res.status).toHaveBeenCalledWith(403);
          expect(res.send).toHaveBeenCalled();
          expect(res.cookie).not.toHaveBeenCalled();
          expect(next).not.toHaveBeenCalled();
          expect(uuid.v4).not.toHaveBeenCalled();
        });

        it('keeps the token from the cookie and does not fail when the csrf tokens match', () => {
          req.method = method;
          req.headers['x-csrf-token'] = csrfTokenUuid;
          req.cookies.csrfToken = csrfTokenUuid;

          verifyCsrfToken(req, res, next);

          expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
          });
          expect(next).toHaveBeenCalled();
          expect(uuid.v4).not.toHaveBeenCalled();
        });

        it('the token is secure when the request comes over ssl', () => {
          req.method = method;
          req.headers['x-csrf-token'] = csrfTokenUuid;
          req.headers['x-forwarded-proto'] = 'https';
          req.cookies.csrfToken = csrfTokenUuid;

          verifyCsrfToken(req, res, next);

          expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
            httpOnly: false,
            secure: true,
            sameSite: 'lax',
          });
          expect(next).toHaveBeenCalled();
          expect(uuid.v4).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('OPTIONS', () => {
    it('adds a token and does not fail when there is no csrf token on the req', () => {
      req.method = 'OPTIONS';

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).toHaveBeenCalled();
    });

    it('keeps the token from the cookie and does not fail when there is a csrf token on the req.cookies', () => {
      req.method = 'OPTIONS';
      req.cookies.csrfToken = csrfTokenUuid;

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).not.toHaveBeenCalled();
    });

    it('keeps the token from the cookie and does not fail when the csrf tokens match', () => {
      req.method = 'OPTIONS';
      req.cookies.csrfToken = csrfTokenUuid;
      req.headers['x-csrf-token'] = csrfTokenUuid;

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).not.toHaveBeenCalled();
    });

    it('the token is secure when the request comes over ssl', () => {
      req.method = 'OPTIONS';
      req.headers['x-forwarded-proto'] = 'https';

      verifyCsrfToken(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('csrfToken', csrfTokenUuid, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      });
      expect(next).toHaveBeenCalled();
      expect(uuid.v4).toHaveBeenCalled();
    });
  });
});
