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

    isProduction: boolean = environment.production;

    rootImgPath: string = environment.Wall.imgPath;

    private item: Item;
    private itemCreatedAtDate;       //json:number  ici dans js:Date
    itemForm: FormGroup;
    displayError = false;
    errorMsg = '';


    fileIsUploading = false;
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
            if(this.isProduction) {
                this.item.path = "/" + new Date().getFullYear();
            }
            else{
                this.item.path = "/DEV";;
            }
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

    onUploadFile(file: File){
        this.fileIsUploading = true;
        this._adminService.uploadFileAPI(file, this.item.path).subscribe(
            (json) =>{
                this.item.file = json['file'];
                const dt = parseInt(json['createdAt'])
                this.itemCreatedAtDate = new Date(dt).toISOString().slice(0,16);
/*
                console.log(new Date(dt).toLocaleString())
                console.log(new Date(dt).toISOString())
                console.log(new Date(dt).toISOString().slice(0,16))
                console.log(new Date(dt).toLocaleDateString())
                console.log(new Date(dt).toJSON())
                console.log(new Date(dt).toUTCString())
                console.log(new Date(dt).toString())
                console.log(new Date(dt).toTimeString())
                var options = {weekday: "narrow", year: "numeric", month: "numeric", day: "numeric", hour:"numeric", minute:"numeric", second:"numeric"};
                console.log(new Date(dt).toLocaleString("fr-FR", options))
*/
                //setValue -> all value of FormGroup
                //patchValue -> only some value of FormGroup
                this.itemForm.patchValue({file: this.item.file});
                this.itemForm.patchValue({createdAt: this.itemCreatedAtDate});

                this.fileIsUploading = false;
                this.fileUploaded = true;
            },
            (error) => {
                console.log("AdminDataService - onUploadFile : Erreur lors de l'upload de l'image..." + error.error.message)
                this.displayError = true;
                this.errorMsg = error.error.message;
                setTimeout(() => {
                    this.displayError = false;
                    this.errorMsg = '';
                },5000);
            }
        )
    }

    detectFiles(event) {
        if(event.target.files && event.target.files.length > 0) {
            this.onUploadFile(event.target.files[0]);
        }
    }

    onSaveItem() {
        if( ((this.isCreation && this.fileUploaded) || !this.isCreation)  && this.itemForm.valid) {
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

    rotateLeft(i: Item){
        this._adminService.rotateImagePI(i,"LEFT").subscribe(
            (msg) => {
                console.log("Image pivotee");
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
    rotateRight(i: Item){
        this._adminService.rotateImagePI(i,"RIGHT").subscribe(
            (msg) => {
                console.log("Image pivotee");
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


    get description(){
        return this.itemForm.get("description");
    }

    get createdAt(){
        return this.itemForm.get("createdAt");
    }

}
