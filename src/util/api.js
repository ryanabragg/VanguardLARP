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

const api = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({storage: store}));

api.register = async (email, password) => {
  try {
    return await api.service('users').create({
      email: email,
      password: password
    });
  } catch (err) {
    return {};
  }
}

api.login = async (email, password) => {
  try {
    return await api.authenticate({
      strategy: 'local',
      email: email,
      password: password
    });
  } catch (err) {
    return {};
  }
};

api.user = async () => {
  try {
    const token = localStorage.getItem('feathers-jwt');
    const payload = await api.passport.verifyJWT(token);
    const user = await api.service('users').get(payload.userId);
    return user;
  } catch (err) {
    return {};
  }
};

export default api;
