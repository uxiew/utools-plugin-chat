declare module 'uTools' {
  import Utools from 'utools-api-types';
  export = Utools;
}

interface Window {
  preload: {
    post: typeof import('./preload/index')['post']
    initServer: typeof import('./preload/index')['initServer']
    API_MODEL_OPT: typeof import('./preload/index')['API_MODEL_OPT']
    retrieve: typeof import('./preload/index')['retrieve']
    DEFAULT_CONFIG: typeof import('./preload/index')['DEFAULT_CONFIG']
    update: typeof import('./preload/index')['update']
  }
}
