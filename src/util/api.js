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
const authStore = localforage.createInstance({
  name: 'VanguardLARP-auth'
});

const api = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({storage: authStore}));

api.register = async (credentials) => {
  try {
    return await api.service('users').create({
      email: credentials.email,
      password: credentials.password
    });
  } catch (err) {
    return {};
  }
}

api.login = async (credentials) => {
  const auth = credentials ?
    Object.assign({strategy: 'local'}, credentials) : {};
  try {
    const result = await api.authenticate(auth);
    const payload = await api.passport.verifyJWT(result.accessToken);
    const user = await api.service('users').get(payload.userId);
    return user;
  } catch (err) {
    return {};
  }
};

export default api;
