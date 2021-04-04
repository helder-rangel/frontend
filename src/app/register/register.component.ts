import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AngularTokenService} from "angular-token";
import {FormControl, Validators} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpUser = {
    name: '',
    login: '',
    password: '',
    passwordConfirmation: ''
  };

  hide = true

  @Output() onFormResult = new EventEmitter<any>();

  constructor(
    private tokenAuthSerivce:AngularTokenService,
    private location: Location
  ) { }
  ngOnInit() {}

  onSignUpSubmit(){

    this.tokenAuthSerivce.registerAccount(this.signUpUser).subscribe(

        (res) => {
          if (res.status == 200){
            console.log('res register ', res)
            this.onFormResult.emit({signedUp: true, res})
          }

        },

        (err) => {
          console.log(err.json())
          this.onFormResult.emit({signedUp: false, err})
        }
    )

  }
}