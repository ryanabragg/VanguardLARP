import { expect } from 'chai';
import request from 'request';

import app from '../src/server';

describe('Feathers application tests', () => {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close();
    done();
  });

  it('starts and shows the homepage', () => {
    request('http://localhost:3030', (error, response, body) => {
      expect(body.indexOf('<html>')).to.not.equal(-1);
    });
  });

  describe('404', function() {
    it('shows a 404 HTML page', () => {
      request({
        url: 'http://localhost:3030/path/to/nowhere',
        headers: {
          'Accept': 'text/html'
        }
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(response.error.indexOf('<html>')).to.not.equal(-1);
      });
    });

    it('shows a 404 JSON error without stack trace', () => {
      request({
        url: 'http://localhost:3030/path/to/nowhere',
        json: true
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(response.error.code).to.equal(404);
        expect(response.error.message).to.equal('Page not found');
        expect(response.error.name).to.equal('NotFound');
      });
    });
  });
});
