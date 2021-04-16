import { Injectable } from '@angular/core'
import { AngularTokenService } from 'angular-token'
import { Subject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable()
export class AuthService {
  userSignedIn$: Subject<boolean> = new Subject()

  constructor(public tokenAuthService: AngularTokenService) {
    this.tokenAuthService
      .validateToken()
      .subscribe((res) =>
        res.status == 200
          ? this.userSignedIn$.next(res.json().success)
          : this.userSignedIn$.next(false)
      )
  }

  logOutUser(): Observable<HttpClient> {
    return this.tokenAuthService.signOut().pipe(
      map((res) => {
        this.userSignedIn$.next(false)
        return res
      })
    )
  }

  registerUser(signUpData: {
    login: string
    password: string
    passwordConfirmation: string
  }): Observable<Response> {
    return this.tokenAuthService.registerAccount(signUpData).pipe(
      map((res) => {
        this.userSignedIn$.next(true)
        return res
      })
    )
  }

  logInUser(signInData: {
    login: string
    password: string
  }): Observable<Response> {
    return this.tokenAuthService.signIn(signInData).pipe(
      map((res) => {
        this.userSignedIn$.next(true)
        return res
      })
    )
  }

  getAuthorizationToken(): Observable<Response> {
    return this.tokenAuthService.validateToken().pipe(
      map((res) => {
        this.userSignedIn$.next(true)
        return res
      })
    )
  }
}
