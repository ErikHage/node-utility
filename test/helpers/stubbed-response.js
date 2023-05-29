class StubbedResponse {
  constructor() {
    this.status = jest.fn().mockReturnThis();
    this.sendStatus = jest.fn().mockReturnThis();
    this.send = jest.fn().mockReturnThis();
    this.redirect = jest.fn().mockReturnThis();
    this.render = jest.fn().mockReturnThis();
    this.setHeader = jest.fn().mockReturnThis();
    this.clearCookie = jest.fn().mockReturnThis();
    this.cookie = jest.fn().mockReturnThis();
  }
}

module.exports = StubbedResponse;
