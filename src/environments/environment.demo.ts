export const environment = {
  production: true,
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
    url: 'http://wall.demo.server.gbcreation.fr',
    wall: '/api/wall',
    home: '/home',
    admin: '/api/admin',
    resource: '/api/resources'
  },
  Wall: {
    imgPath: 'http://wall.demo.server.gbcreation.fr/api/resources/get'
  }
};
