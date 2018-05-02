import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authStatus: boolean;
  
  constructor(private formBuilder:FormBuilder, private _authService: AuthService, private _router:Router) { }

  ngOnInit() {
  	this.authStatus = this._authService.isAuth;
    this.initForms();
  }

  initForms(){
    this.loginForm = this.formBuilder.group(
        {
          email: ['', [Validators.required,  Validators.email]],
          password: ['', Validators.required]
        }
      );
  }


   onSubmitForm(){
      const formValue = this.loginForm.value;
      const email = formValue['email'];
      const pwd = formValue['password'];
      this._authService.signIn(email, pwd).then(
        () => {
          this.authStatus = this._authService.isAuth;
          this._router.navigate(['admin']);
        },
        (error)=>{
          console.log('youhouuuu')
        }
      );
  }


  onSignOut(){
  	this._authService.signOut();
  	this.authStatus = this._authService.isAuth;
  }

}
