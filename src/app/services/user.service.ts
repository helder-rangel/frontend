import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable  } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private router: Router ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUser() {
    // not working yet
    return this.http.get<User>(`${environment.SERVER_URL}/users`);
  }

  getAdresses(): any {
    return this.http.get<any>(`${environment.SERVER_URL}/enderecos`, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
        })
    })
  }

  updateAddress(
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    user_id: string
  ) {
    return this.http
      .post<any>(`${environment.SERVER_URL}/enderecos`, {
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
        user_id
      }, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
        })
      })
  }
}
