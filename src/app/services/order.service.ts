import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { map, filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class OrderService{
	private products: ProductResponseModel[] = [];
	private serverUrl = environment.SERVER_URL;
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient,  private router: Router) {
		this.currentUserSubject = new BehaviorSubject<User>(
			JSON.parse(localStorage.getItem("currentUser"))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	getAllOrders(): any {
		return this.http.get(this.serverUrl + "/pedidos", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
      })
    }).pipe(map((order: []) => order.filter((o: any) => {
			return o.user.id === this.currentUserSubject?.value.user_id
		})));
	}

	getSingleOrder(orderId: number): any {
		return this.http.get<ProductResponseModel>(this.serverUrl + '/pedidos/' + orderId, {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
			})
		}).toPromise()
	}

	getAllOrderDetails(): any {
		return this.http.get(this.serverUrl + '/pedido_detalhes/', {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
			})
		}).pipe(map((order: []) => order.filter((o: any) => {
			return o.pedido.user_id === this.currentUserSubject?.value.user_id
		})))
	}

	orderItems(orderId: number, totalProds: number, productId: Number) {
		console.log(orderId, totalProds, productId)
		console.log(`${this.serverUrl}/pedido_detalhes`)
		console.log('user ', this.currentUserSubject?.value["token"])
		return this.http.post(`${this.serverUrl}/pedido_detalhes`, {
			quantidade: totalProds,
			produto_id: productId,
			pedido_id: orderId
		}, {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.currentUserSubject?.value["token"] || this.currentUserSubject?.value["access_token"]}`,
			})
		}).subscribe(data => data)
	}
}

interface ProductResponseModel{
	id: number;
	nome: string;
	preco: number;
	imagem: string;
	quantidade: Number;
}