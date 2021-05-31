<<<<<<< HEAD
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
=======
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
      

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    
    return this.http
      .post<any>(`${environment.SERVER_URL}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
         
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http
      .post<any>(`${environment.SERVER_URL}/auth/register`, {
        name,
        email,
        password,
        password_confirmation,
      })
      .pipe(
        map((user) => {
          console.log("===== new user ", user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    console.log("------------------------- &&");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token")
    this.currentUserSubject.next(null);
>>>>>>> master
  }
}
