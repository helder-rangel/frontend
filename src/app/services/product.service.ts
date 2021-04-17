import { ProductModelServer, ServerResponse } from "./../models/product.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { AuthenticationService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private SERVER_URL = environment.SERVER_URL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    console.log("this.currentUserSubject.value ", this.currentUserSubject);
    console.log(
      "this.currentUserSubject.value ",
      this.currentUserSubject.value
    );
  }

  showMessage() {
    console.log("Chamando serviço");
  }

  //metodo pra listar tds os produtos
  getAllProducts(numberoOfResults = 10): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + "/produtos", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
      }),
      params: {
        limit: numberoOfResults.toString(),
      },
    });
  }

  /*Get UM Produto*/
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(
      this.SERVER_URL + "/produtos/" + id
    );
  }

  /*get produtos  categoria criar categoria*/

  getProductsFromCategoria(catName: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + "pedidos");
  }
}
