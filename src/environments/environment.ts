// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  versions:{
    angular:'v 0.3.1',
    java:'v 0.3.1'
  },
  home : {
  	title: 'Guillaume Besset',
  	description: 'Wall Demo'
  },
  apiURL: {
  	key: 'aSecretKey',
  	url: 'http://localhost:8080',
    wall: '/api/wall',
    home: '/home',
    admin: '/api/admin',
    resource: '/api/resources',
    src_img: '/api/resources/get'
  },
  Wall: {
      imgPath: 'http://localhost:8080/api/resources/get'
  }
};
