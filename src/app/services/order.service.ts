import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class OrderService{
   private products: ProductResponseModel[] = [];
   private serverUrl = environment.SERVER_URL;
   private currentUserSubject: BehaviorSubject<User>;
   public currentUser: Observable<User>;

    constructor(private http: HttpClient,  private router: Router  ){
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem("currentUser"))
          );
          this.currentUser = this.currentUserSubject.asObservable();
    }

    getSingleOrder(orderId: number){
        return this.http.get<ProductResponseModel[]>(this.serverUrl + '/pedidos/' + orderId, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
              })
        }).toPromise();
    }
}

interface ProductResponseModel{
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    quantidade: Number;

}