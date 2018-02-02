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
  return await api.service('users').create({
    name: credentials.name,
    email: credentials.email,
    password: credentials.password
  });
};

api.accountVerifySignup = async (email) => {
  let user = await api.getUser();
  if(user.verifySignup)
    return Promise.reject('User already verified');
  return api.service('verification').create({
    action: 'resendVerifySignup',
    value: {
      email: email
    }
  });
}

// for initial signup  or idenntity changes
api.accountAcceptIdentity = async (token) => {console.log(token)
  return api.service('verification').create({
    action: 'verifySignupLong',
    value: token
  });
}

api.accountChangeIdentity = async (email, password, changes) => {
  let user = await api.getUser();
  if(!user._id || user.email != email)
    return Promise.reject('Not logged in');
  return api.service('verification').create({
    action: 'identityChange',
    value: {
      user: {
        email: email
      },
      password: password,
      changes: changes // e.g. {email: new@email.com, name: update}
    }
  });
}

api.accountChangeField = async (email, changes) => {
  let user = await api.getUser();
  if(!user._id || user.email != email)
    return Promise.reject('Not logged in');
  return api.service('users').patch(user._id, changes);
}

api.accountChangePassword = async (email, oldPassword, password) => {
  let user = await api.getUser();
  if(!user._id || user.email != email)
    return Promise.reject('Not logged in');
  return api.service('verification').create({
    action: 'passwordChange',
    value: {
      user: {
        email: email
      },
      oldPassword: oldPassword,
      password: password
    }
  });
}

api.accountRequestPassword = async (email) => {
  return api.service('verification').create({
    action: 'sendResetPwd',
    value: {
      email: email
    }
  });
}

api.accountResetPassword = async (token, password) => {
  return api.service('verification').create({
    action: 'resetPwdLong',
    value: {
      token: token,
      password: password
    }
  });
}

api.login = async (credentials) => {
  let auth = credentials ?
    Object.assign(credentials, {strategy: 'local'}) : {};
  try {
    let result = await api.authenticate(auth);
    let payload = await api.passport.verifyJWT(result.accessToken);
    return await api.service('users').get(payload.userId);
  } catch (error) {
    return Promise.reject(error);
  }
};

api.getUser = async () => {
  try {
    let jwt = await api.passport.getJWT();
    let result = await api.authenticate({strategy: 'jwt', accessToken: jwt});
    let payload = await api.passport.verifyJWT(result.accessToken);
    return await api.service('users').get(payload.userId);
  } catch (error) {
    return Promise.reject(error);
  }
};

api.getLocal = async (key) => {
  return localforage.getItem(key);
};

api.setLocal = async (key, data) => {
  return localforage.setItem(key, data);
};

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
      return Promise.resolve(value.data);

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
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

api.setServiceData = async (service, data) => {
  if(!service || !data)
    return Promise.reject();
  try {
    await localforage.setItem(service, {
      data: data,
      expires: 0
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default api;
