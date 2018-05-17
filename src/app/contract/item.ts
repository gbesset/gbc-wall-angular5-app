import {Comment} from './comment';

export class Item {

    id?: number;
    file: string;
    path: string;
    description: string;
    createdAt: Date;
    ratio?: number
    nbLike?: number;
    type: string;
    comments: Array<Comment>;
}