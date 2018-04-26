import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authStatus: boolean;
  
  constructor(private _authService: AuthService, private _router:Router) { }

  ngOnInit() {
  	this.authStatus = this._authService.isAuth;
  }

  onSignIn(){
  	this._authService.signIn().then(
  		() => {
  				this.authStatus = this._authService.isAuth;
  				this._router.navigate(['admin']);
  			}
  		);
  }

  onSignOut(){
  	this._authService.signOut();
  	this.authStatus = this._authService.isAuth;
  }

}
