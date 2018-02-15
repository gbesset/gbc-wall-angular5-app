import { Comment } from '../contract/comment';

export const MOCK_COMMENTS: Comment[] = [
  {id:1 , author: 'author 1', comment: 'premier commentaire', isApproved:true, createdAt:'1518603484818',itemId:1},
  {id:2 , author: 'author 2', comment: 'un autre commentaire', isApproved:true, createdAt:'1518603484818',itemId:6},
  {id:3 , author: 'author 1', comment: 'enfin le dernier commentaire', isApproved:true, createdAt:'1518603484818',itemId:4}
];