import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Item } from '../../../contract/item';
import {AdminDataService} from '../../../services/admin-data.service';
import {Router} from '@angular/router';

import {environment} from '../../../../environments/environment';




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
    private itemCreatedAtDate;       //json:number  ici dans js:Date
    itemForm: FormGroup;
    displayError = false;
    errorMsg = '';


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
        //Initie un objet vide pour la création et l'update (récup des données sur le server)
        this.item = new Item("", "", "", "PICTURE");

        this.getItem();

        this.initForm();
    }

    getItem(){
        if(this.isCreation){
            this.item.type = "PICTURE";
            this.item.path =  this.path + "/" + new Date().getFullYear() + "/";
        }
        else{
            this._adminService.getItemId(this.itemId).subscribe(
                (item) => {
                    this.item = <Item>item['item'];
                    this.itemForm.patchValue({
                        file: this.item.file,
                        description: this.item.description,
                        createdAt: new Date(this.item.createdAt).toISOString().slice(0, 16),
                        path: this.item.path
                    });
                },
                (error) => {
                    console.log("Error de récupération de l'item id :"+this.itemId);
                    this.errorMsg = error.error.message;
                    this.displayError = true;
                    setTimeout(() => {
                        this.displayError = false;
                        this.errorMsg = '';
                    },5000);
                }
            );
        }

    }
    initForm() {
        const path = this.item.path;

        //file: new FormControl({file: file, disabled: true}, Validators.required),
        this.itemForm = this.formBuilder.group({
            file: ['', Validators.required],
            description: ['', Validators.required],
            createdAt: ['', Validators.required],
            path: [path]
        }, {updateOn: 'blur'});



    }

    onUpload(){
        this.item.file = "file-uploaded" + Date.now().toString()+ ".jpg";
        //this.item.createdAt = new Date().toISOString().slice(0, 16);
        this.itemCreatedAtDate = new Date().toISOString().slice(0, 16);
        //setValue -> all value of FormGroup
        //patchValue -> only some value of FormGroup
        this.itemForm.patchValue({file: this.item.file});
        this.itemForm.patchValue({createdAt: this.itemCreatedAtDate});
    }

    onSaveItem() {
        if(this.itemForm.valid) {
            this.item.description = this.itemForm.get('description').value;
            this.itemCreatedAtDate = this.itemForm.get('createdAt').value;

            //const type = this.itemForm.get('type').value


            //TRANSFORME LA DATE en milisecondes....
            this.item.createdAt = new Date(this.itemCreatedAtDate).getTime();
            this._adminService.updateOrSaveItemAPI(this.item).subscribe(
                (itemAdded: Item) => {
                    console.log("Ajout ou Mise a jour de l'item " + itemAdded.id + " OK.");
                    console.log(itemAdded.createdAt)
                    this.router.navigate(['/admin/items']);
                },
                (error) => {
                    console.log("AdminDataService - updateOrSaveItemAPI - Error :" + error.error.message);
                    this.errorMsg = error.error.message;
                    this.displayError = true;
                    setTimeout(() => {
                       this.displayError = false;
                       this.errorMsg = '';
                    },5000);
                }
            );
        }
    }

    get description(){
        return this.itemForm.get("description");
    }

    get createdAt(){
        return this.itemForm.get("createdAt");
    }

}
