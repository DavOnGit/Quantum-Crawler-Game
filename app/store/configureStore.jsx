// export devtools and logger only in dev mode

let loadedStore = null;

if (process.env.NODE_ENV === 'production') {
  loadedStore = require('./configureStore.prod').default
} else {
  loadedStore = require('./configureStore.dev').default
}

export const configureStore = loadedStore;
