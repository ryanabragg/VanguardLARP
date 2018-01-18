import feathers from 'feathers/client';
import hooks from 'feathers-hooks';

import io from 'socket.io-client';
import socketio from 'feathers-socketio/client';

import auth from 'feathers-authentication-client';

import localforage from 'localforage';

import serverURL from './server-url';

let socket = io(serverURL);

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
  let auth = credentials ?
    Object.assign({strategy: 'local'}, credentials) : {};
  try {
    let result = await api.authenticate(auth);
    let payload = await api.passport.verifyJWT(result.accessToken);
    return await api.service('users').get(payload.userId);
  } catch (err) {
    return {};
  }
};

api.getUser = async () => {
  try {
    let jwt = await api.passport.getJWT();
    let result = await api.authenticate({strategy: 'jwt', accessToken: jwt});
    let payload = await api.passport.verifyJWT(result.accessToken);
    return await api.service('users').get(payload.userId);
  } catch (error) {
    return {};
  }
}

api.getServiceData = async (service, reload = false) => {
  try {
    let value = {
      data: [],
      expires: 0
    };
    let keys = await localforage.keys();
    if(!reload && keys.indexOf(service) > -1)
      value = await localforage.getItem(service);

    if(value.data.length && value.expires > Date.now())
      return value.data;

    let page = await api.service(service).find({
      query:{
        $skip: 0, $limit: 1000
      }
    });
    let data = [].concat(page.data);
    while(page.skip <= page.total) {
      page = await api.service(service).find({
        query: {
        $skip: page.skip + page.limit, $limit: page.limit
        }
      });
      data = data.concat(page.data);
    }
    await localforage.setItem(service, {
      data: data,
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000
    });
    return data;
  } catch (error) {
    return error;
  }
}

api.setServiceData = async (service, data) => {
  if(!service || !data)
    return;
  try {
    await localforage.setItem(service, {
      data: data,
      expires: 0
    });
  } catch (error) {
    return error;
  }
}

export default api;
