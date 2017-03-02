let loadedModule = null;

if (process.env.NODE_ENV === 'production') {
  loadedModule = require('Root.prod').default;
} else {
  loadedModule = require('Root.dev').default;
}

// export const Root = loadedModule;
export default loadedModule;
