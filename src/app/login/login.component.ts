import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {AngularTokenService} from "angular-token";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInUser = {
    login: '',
    password: ''
  };

  hide = true

  @Output() onFormResult = new EventEmitter<any>();
  constructor(
    private router: Router,
    private tokenAuthSerivce:AngularTokenService,
    public authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onSignInSubmit(){
    this.authService.logInUser(this.signInUser).subscribe(
      res => {
        if(res.status == 200){
          console.log('res -login ', res)
          this.onFormResult.emit({signedIn: true, res});
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log('err:', err);
        this.onFormResult.emit({signedIn: false, err});
      }
    );
  }

  //   this.tokenAuthSerivce.signIn(this.signInUser).subscribe(

  //       res => {
  //         console.log('res login ', res)
  //         if(res.status == 200){
  //           this.onFormResult.emit({signedIn: true, res});
  //           this.router.navigate(['/']);
  //         }
  //       },

  //       err => {
  //         console.log('err:', err);
  //         this.onFormResult.emit({signedIn: false, err});
  //       }
  //   )

}
