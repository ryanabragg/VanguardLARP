/* eslint-env browser */
'use strict';

if('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister();
  });
}
