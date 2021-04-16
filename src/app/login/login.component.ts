import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInUser = {
    login: '',
    password: '',
  }

  hide = true

  @Output() onFormResult = new EventEmitter<any>()
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {}

  onSignInSubmit() {
    this.authService.logInUser(this.signInUser).subscribe(
      (res) => {
        if (res.status == 200) {
          // window.localStorage.setItem(
          //   'accessToken',
          //   res.headers.get('access-token')
          // )
          // window.localStorage.setItem('client', res.headers.get('client'))
          // window.localStorage.setItem('uid', res.headers.get('uid'))
          // window.localStorage.setItem(
          //   'content-type',
          //   res.headers.get('content-type')
          // )

          this.onFormResult.emit({ signedIn: true, res })
          this.router.navigate(['/store'])
        }
      },
      (err) => {
        console.log('err:', err)
        this.onFormResult.emit({ signedIn: false, err })
      }
    )
  }
}
