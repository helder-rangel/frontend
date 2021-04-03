import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AngularTokenService} from "angular-token";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpUser = {
    nome: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    login: ''
  };

  hide = true

  @Output() onFormResult = new EventEmitter<any>();

  constructor(private tokenAuthSerivce:AngularTokenService) { }
  ngOnInit() {}

  onSignUpSubmit(){

    this.tokenAuthSerivce.registerAccount(this.signUpUser).subscribe(

        (res) => {

          if (res.status == 200){
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