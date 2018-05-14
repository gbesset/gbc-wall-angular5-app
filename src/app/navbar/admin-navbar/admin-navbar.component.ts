import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

    constructor(private _authService: AuthService) { }

    ngOnInit() {
    }

    onSignOut(){
        this._authService.signOut();
    }

}
