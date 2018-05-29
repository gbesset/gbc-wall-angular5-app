import {Comment} from './comment';

export class Item {

    id?: number;
    createdAt: number;
    updatedAt: Date;
    ratio?: number
    nbLike?: number;
    comments: Array<Comment>;

    constructor(public file: string, public description: string, public path: string, public type: string){}
}