import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {AngularTokenService} from "angular-token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInUser = {
    email: '',
    password: '',
    login: ''
  };

  hide = true

  @Output() onFormResult = new EventEmitter<any>();
  constructor(private tokenAuthSerivce:AngularTokenService) { }

  ngOnInit(): void {
  }

  onSignInSubmit(){

    this.tokenAuthSerivce.signIn(this.signInUser).subscribe(

        res => {
          if(res.status == 200){
            this.onFormResult.emit({signedIn: true, res});
          }
        },

        err => {
          console.log('err:', err);
          this.onFormResult.emit({signedIn: false, err});
        }
    )

  }

}
