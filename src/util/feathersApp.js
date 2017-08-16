import feathers from 'feathers/client';
import hooks from 'feathers-hooks';

import io from 'socket.io-client';
import socketio from 'feathers-socketio/client';

import auth from 'feathers-authentication-client';

import localforage from 'localforage';

let socket = io('localhost:3030');
if(!socket.connected)
  socket = io('192.168.1.167:3030');

localforage.config({
  name: 'VanguardLARP'
});
const store = localforage.createInstance({
  name: 'VanguardLARP-auth'
});

const app = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({storage: store}));

app.signup = async (email, password) => {
  try {
    return await app.service('users').create({
      email: email,
      password: password
    });
  } catch (err) {
    return {};
  }
}

app.login = async (email, password) => {
  try {
    return await app.authenticate({
      strategy: 'local',
      email: email,
      password: password
    });
  } catch (err) {
    return {};
  }
};

app.auth = async () => {
  try {
    const token = localStorage.getItem('feathers-jwt');
    const payload = await app.passport.verifyJWT(token);
    const user = await app.service('users').get(payload.userId);
    return user;
  } catch (err) {
    return {};
  }
};

export default app;
