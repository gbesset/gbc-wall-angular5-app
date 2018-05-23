import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Item } from '../../../contract/item';
import {AdminDataService} from '../../../services/admin-data.service';
import {Router} from '@angular/router';
import {isUndefined} from 'util';
import {environment} from '../../../../environments/environment';
import {createHash} from 'crypto';



@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.css']
})

export class ItemFormComponent implements OnInit {

    @Input() itemId: number;
    @Input() isCreation: boolean;
    private path: string = environment.apiURL.path_img;

    private item: Item;
    itemForm: FormGroup;


    fileIsUploading = false;
    fileUrl: string;
    fileUploaded = false;

    itemType = {
        "PICTURE": "",
        "VIDEO": "http://",
        "VIDEO_YOUTUBE": "http://www.youtube.com/embed/",
        "VIDEO_VIMEO" : "http://player.vimeo.com/video/"
    };


    constructor(private formBuilder: FormBuilder, private _adminService: AdminDataService,
                private router: Router) { }

    ngOnInit() {
        this.getItem();

        console.log('VERIFFFFF')
        console.log(this.item)

    }

    getItem(){
        if(this.isCreation){
            this.item = new Item("", "", "", "PICTURE");
            this.item.path =  this.path + "/" + new Date().getFullYear() + "/"
            this.initForm();
        }
        else{
            this._adminService.getItemId(this.itemId).subscribe(
                (item) => {
                    this.item = <Item>item['item'];
                    this.initForm();
                },
                (error) => {
                    console.log("Error de récupération de l'item id :"+this.itemId);
                }
            );
        }

    }
    initForm() {
        const file =  this.item.file;
        const description = this.isCreation ? '' : this.item.description;
        const path = this.item.path;
        const createdAt = this.isCreation ? '' : this.item.createdAt;

        //file: new FormControl({file: file, disabled: true}, Validators.required),
        this.itemForm = this.formBuilder.group({
            file: [file, Validators.required],
            description: [description, Validators.required],
            createdAt: [createdAt, Validators.required],
            path: [path]
        }, {updateOn: 'blur'});



    }

    onUpload(){
        this.item.file = "file-uploaded.jpg";
        this.item.createdAt = new Date();
        //setValue -> all value of FormGroup
        //patchValue -> only some value of FormGroup
        this.itemForm.patchValue({file: this.item.file});
        this.itemForm.patchValue({createdAt: this.item.createdAt});
    }

    onSaveItem() {
        this.item.file;
        this.item.description = this.itemForm.get('description').value;
        this.item.path = this.itemForm.get('path').value;
        this.item.createdAt = this.itemForm.get('createdAt').value;

        //const type = this.itemForm.get('type').value

        this._adminService.updateOrSaveItemAPI(this.item);
    }

    get description(){
        return this.itemForm.get("description");
    }

    get createdAt(){
        return this.itemForm.get("createdAt");
    }

}
