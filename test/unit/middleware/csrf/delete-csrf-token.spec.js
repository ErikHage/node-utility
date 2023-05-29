const deleteCsrfToken = require('../../../../lib/middleware/csrf/delete-csrf-token');
const StubbedResponse = require('../../../helpers/stubbed-response');

describe('Delete CSRF Token Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = new StubbedResponse();
    next = jest.fn();
  });

  afterEach(() => {

  });

  it('clears the csrfToken cookie from the response', () => {
    deleteCsrfToken(req, res, next);

    expect(res.clearCookie).toHaveBeenCalledWith('csrfToken');
    expect(next).toHaveBeenCalled();
  });
});
