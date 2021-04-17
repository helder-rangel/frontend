import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class OrderService{
   private products: ProductResponseModel[] = [];
   private serverUrl = environment.SERVER_URL;

    constructor(private http: HttpClient){}

    getSingleOrder(orderId: number){
        return this.http.get<ProductResponseModel[]>(this.serverUrl + '/compras/' + orderId).toPromise();
    }
}

interface ProductResponseModel{
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    quantidade: Number;

}