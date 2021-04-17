import { ProductModelServer, ServerResponse } from './../models/product.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL
  constructor(private http: HttpClient, private router: Router) { }

  showMessage(){
    console.log("Chamando serviço");
  }

  //metodo pra listar tds os produtos
  getAllProducts(numberoOfResults = 10) :Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.SERVER_URL+'/produtos',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTg2Mzc1NDV9.LSFEmBxgG1Lg_PLfQB87Bxmlv4GVnuKm1jNVZGWNuNo'}`
      }),
      params:{
        limit:numberoOfResults.toString()
      }
    }) ;
  }

  /*Get UM Produto*/
  getSingleProduct(id:number):Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL+'/produtos/' + id)
  }

  /*get produtos  categoria criar categoria*/

  getProductsFromCategoria(catName: string) : Observable<ProductModelServer[]>{
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + 'pedidos')
  }
}
