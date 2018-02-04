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

api.register = (credentials) => {
  return api.service('users').create({
    name: credentials.name,
    email: credentials.email,
    password: credentials.password
  });
};

api.accountVerifySignup = (email) => {
  api.getUser()
  .then(user => {
    if(user.verifySignup)
      throw new Error('User already verified');
  })
  .then(() => api.service('verification').create({
    action: 'resendVerifySignup',
    value: {
      email: email
    }
  }));
}

api.accountAcceptIdentity = (token) => {
  return api.service('verification').create({
    action: 'verifySignupLong',
    value: token
  });
}

api.accountChangeIdentity = (email, password, changes) => {
  api.getUser()
  .then(user => {
    if(!user._id || user.email != email)
      throw new Error('Not logged in');
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
  });
}

api.accountChangeField = (email, changes) => {
  api.getUser()
  .then(user => {
    if(!user._id || user.email != email)
      throw new Error('Not logged in');
    return api.service('users').patch(user._id, changes);
  });
}

api.accountChangePassword = (email, oldPassword, password) => {
  api.getUser()
  .then(user => {
    if(!user._id || user.email != email)
      throw new Error('Not logged in');
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
  });
}

api.accountRequestPassword = (email) => {
  return api.service('verification').create({
    action: 'sendResetPwd',
    value: {
      email: email
    }
  });
}

api.accountResetPassword = (token, password) => {
  return api.service('verification').create({
    action: 'resetPwdLong',
    value: {
      token: token,
      password: password
    }
  });
}

api.login = (credentials) => {
  let auth = credentials ? Object.assign(credentials, {strategy: 'local'}) : {};
  return api.authenticate(auth)
  .then(result => api.passport.verifyJWT(result.accessToken))
  .then(payload => api.service('users').get(payload.userId));
};

api.getUser = () => {
  return api.passport.getJWT()
  .then(jwt => api.authenticate({strategy: 'jwt', accessToken: jwt}))
  .then(result => api.passport.verifyJWT(result.accessToken))
  .then(payload => api.service('users').get(payload.userId))
  .catch(error => {return {};});
};

api.getLocal = (key) => {
  return localforage.getItem(key);
};

api.setLocal = (key, data) => {
  return localforage.setItem(key, data);
};

api.getServiceData = (service, reload = false) => {
  return localforage.keys()
  .then(keys => {
    if(!reload && keys.indexOf(service) > -1)
      return localforage.getItem(service);
    return {
      data: [],
      expires: 0
    };
  }).then(value => {
    if(!value.data.length || Date.now() > value.expires)
      throw new Error('No stored data');
    return value.data;
  }).catch(() => {
    return api.service(service).find({ query: { $limit: 1000 } })
    .then(firstPage => {
      if(Array.isArray(firstPage))
        return firstPage;
      let pages = Math.ceil(firstPage.total / firstPage.limit) - 1;
      if(pages <= 0)
        return firstPage.data;
      pages = Array.from(Array(pages))
        .map((value, index) => api.service(service).find({
          query: {
            $skip: (index + 1) * firstPage.limit,
            $limit: firstPage.limit
          }
        }));
      return Promise.all(pages)
        .then(values => [firstPage.data].concat(values.map(v => v.data)))
        .then(values => [].concat.apply([], values));
    });
  })
  .then(data => {
    localforage.setItem(service, {
      data: data,
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000
    });
    return data;
  })
  .catch(error => []);
};

api.setServiceData = (service, data) => {
  if(!service || !data)
    return Promise.reject();
  localforage.setItem(service, {
    data: data,
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000
  });
};

export default api;
