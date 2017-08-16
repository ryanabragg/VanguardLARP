import feathers from 'feathers/client';
import hooks from 'feathers-hooks';

import io from 'socket.io-client';
import socketio from 'feathers-socketio/client';

import auth from 'feathers-authentication-client';

let socket = io('localhost:3030');
if(!socket.connected)
  socket = io('192.168.1.167:3030');

const app = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({storage: window.localStorage}));

app.login = (email, password) => {
  try {
    return app.authenticate({
      strategy: 'local',
      email: email,
      password: password
    });
  } catch (err) {
    return {};
  }
};

app.auth = () => {
  try {
    const token = localStorage.getItem('feathers-jwt');
    const payload = app.passport.verifyJWT(token);
    const user = app.service('users').get(payload.userId);
    return user;
  } catch (err) {
    return {};
  }
};

export default app;
