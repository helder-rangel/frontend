import { CartModelServer, CartModelPublic } from './../models/cart.model';
import { OrderService } from './order.service';
import { ProductService } from './product.service';
import {Injectable} from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable  } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ProductModelServer } from '../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})

export class CartService{

    ServerURL = environment.SERVER_URL;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  private cartDataClient: CartModelPublic = {prodData: [{incart: 0, id: 0}], total: 0};  // This will be sent to the backend Server as post data
  // Cart Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<Number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private httpClient: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {

    this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    if (info != null && info != undefined && info.prodData[0].incart != 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
          //@ts-ignore
        this.productService.getSingleProduct(p.id).subscribe((actualProdInfo: ProductModelServer) => {
          if (this.cartDataServer.data[0].numInCart == 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({...this.cartDataServer});
        });
      });
    }
  }

  CalculateSubTotal(index): Number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    //@ts-ignore
    subTotal = p.product.preco * p.numInCart;

    return subTotal;
  }

  AddProductToCart(id: number, quantity?: number) {
    this.productService.getSingleProduct(id).subscribe(prod => {
      // If the cart is empty

      if (this.cartDataServer.data[0].product == undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity != undefined ? quantity : 1;

        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
        this.toast.success(`${prod.nome} added to the cart.`, "Produto Adicionado", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })

      }  // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);

        // 1. Se o produto escolhido já estiver na matriz do carrinho
        if (index !== -1) {
          if (quantity != undefined && quantity <= prod.quant) {
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quant ? quantity : prod.quant;
          } else {
            //@ts-ignore
            this.cartDataServer.data[index].numInCart < prod.quant ? this.cartDataServer.data[index].numInCart++ : prod.quant;
          }
          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.toast.info(`${prod.nome} quantity updated in the cart.`, "Product Updated", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        // 2.Se o produto escolhido não estiver na matriz do carrinho
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });
          this.toast.success(`${prod.nome} added to the cart.`, "Product Added", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
      }  // END of ELSE
    });
  }

  UpdateCartData(index, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      //@ts-ignore
      data.numInCart < data.product.quant ? data.numInCart++ : data.product.quant;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      //@ts-ignore
      data.numInCart--;
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        this.cartDataObs$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total == 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        this.cartDataObs$.next({...this.cartDataServer});
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }


  }

  CheckoutFromCart(userId: number) {

    this.httpClient.post(`${this.ServerURL}/pedidos`, null,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
      })
    }).subscribe((res: { success: Boolean }) => {
      console.clear();

      if (res.success) {


        this.resetServerData();
        this.httpClient.post(`${this.ServerURL}/pedidos`, {
          userId: userId,
          products: this.cartDataClient.prodData,
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.currentUserSubject?.value["access_token"]}`,
          })
        }).subscribe((data: OrderConfirmationResponse) => {

          this.orderService.getSingleOrder(data.order_id).then(prods => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };
              this.spinner.hide().then();
              this.router.navigate(['/thankyou'], navigationExtras).then(p => {
                this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          });

        })
      } else {
        this.spinner.hide().then();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, "Order Status", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }
    })
  }


  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p;
      const {preco} = p.product;
      //@ts-ignore
      Total += numInCart * preco;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartDataObs$.next({...this.cartDataServer});
  }

}

interface OrderConfirmationResponse {
  order_id: number;
  success: Boolean;
  message: String;
  products: [{
    id: String,
    numInCart: String
  }]
}

//@ts-ignore