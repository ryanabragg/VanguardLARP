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
        expect(response.statusMessage).to.equal('Not Found');
        expect(body.indexOf('<html>')).to.equal(0);
        expect(body.lastIndexOf('</html>')).to.equal(body.length - 7);
      });
    });

    it('shows a 404 JSON error without stack trace', () => {
      request({
        url: 'http://localhost:3030/path/to/nowhere',
        json: true
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(response.statusMessage).to.equal('Not Found');
        expect(JSON.stringify(body).indexOf('{')).to.equal(0);
        expect(JSON.stringify(body).lastIndexOf('}')).to.equal(JSON.stringify(body).length - 1);
      });
    });
  });
});
