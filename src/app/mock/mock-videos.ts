import { Item } from '../contract/item';

export const MOCK_VIDEOS: Item[] = [
  {id:3 , path: '/path/to/file/', file: 'video 1', description: 'a la mer', createdAt: new Date(), nbLike:8,type:'VIDEO_YOUTUBE' },
  {id:4 , path: '/path/to/file/', file: 'video number 2 dzd dz  z fzd z', description: 'au ski', createdAt:new Date(), nbLike:1 ,type:'VIDEO_VIMEO'},
  {id:7 , path: '/path/to/file/', file: 'video 2', description: 'loto', createdAt:new Date(), nbLike:1 ,type:'VIDEO'},
  {id:10 , path: '/path/to/file/', file: 'video 3', description: 'a l\'ecole', createdAt: new Date(), nbLike:2 ,type:'VIDEO_YOUTUBE'},
  {id:13 , path: '/path/to/file/', file: 'video ', description: 'presque la fin', createdAt:new Date(), nbLike:1,type:'VIDEO' }
];