import { Item } from '../contract/item';

export const MOCK_ITEMS: Item[] = [
  {id:1 , path: '/path/to/file/', file: 'picture1.jpg', description: 'a la montagne', createdAt: new Date(), nbLike:2 , type:'PICTURE'},
  {id:2 , path: '/path/to/file/', file: 'picture2.png', description: 'a la mer', createdAt:  new Date(), nbLike:0 ,type:'PICTURE'},
  {id:3 , path: '/path/to/file/', file: 'video 1', description: 'a la mer', createdAt: new Date(), nbLike:8 ,type:'VIDEO_YOUTUBE'},
  {id:4 , path: '/path/to/file/', file: 'video number 2 dzd dz  z fzd z', description: 'au ski', createdAt: new Date(), nbLike:1 ,type:'VIDEO_VIMEO'},
  {id:5 , path: '/path/to/file/', file: 'picture4.jpg', description: 'vacances c\'est parti', createdAt: new Date(), nbLike:0 ,type:'PICTURE'},
  {id:6 , path: '/path/to/file/', file: 'picture5.png', description: 'en route', createdAt:  new Date(), nbLike:0 ,type:'PICTURE'},
  {id:7 , path: '/path/to/file/', file: 'video 2', description: 'loto', createdAt: new Date(), nbLike:1 ,type:'VIDEO'},
  {id:8 , path: '/path/to/file/', file: 'picture6.jpg', description: 'je sais plus quoi dire', createdAt: new Date(), nbLike:4 ,type:'PICTURE'},
  {id:9 , path: '/path/to/file/', file: 'picture7.png', description: 'la famille', createdAt: new Date(), nbLike:7 ,type:'PICTURE'},
  {id:10 , path: '/path/to/file/', file: 'video 3', description: 'a l\'ecole', createdAt:  new Date(), nbLike:2 ,type:'VIDEO_YOUTUBE'},
  {id:11 , path: '/path/to/file/', file: 'picture8.jpg', description: 'niiiiice', createdAt: new Date(), nbLike:6 ,type:'PICTURE'},
  {id:12 , path: '/path/to/file/', file: 'picture9.png', description: 'encore quelques unes', createdAt: new Date(), nbLike:0 ,type:'PICTURE'},
  {id:13 , path: '/path/to/file/', file: 'video ', description: 'presque la fin', createdAt: new Date(), nbLike:1 ,type:'VIDEO'},
  {id:14 , path: '/path/to/file/', file: 'picture10.png', description: 'ok, last one', createdAt: new Date(), nbLike:3 ,type:'PICTURE'}
];