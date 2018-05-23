export class Comment{
    id?: number;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;


    constructor(public itemId: number, public author: string, public comment: string){}

}