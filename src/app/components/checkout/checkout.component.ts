import { first } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OrderService } from './../../services/order.service';
import { CartService } from './../../services/cart.service';
import { CartModelServer } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../models/user.model';
import { AuthenticationService } from "../../services/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  showSpinner: Boolean;
  addressForm: FormGroup;
  currentUser: User;
  loading = false;
  submittedAddress = false;
  error = "";
  checkoutForm: any;
  requiredMsg = 'Campo é obrigatório'

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toast: ToastrService
  ) {
    this.authenticationService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
  }


  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', ''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      // user_id: ['', []]
    })
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  get fields() {
    console.log(this.addressForm)
    return this.addressForm.controls;
  }

  updateAddressSubmit() {
    this.submittedAddress = true;
    if (this.addressForm.status === 'INVALID') {
      console.log(this.addressForm)
      console.log('this.fields ', this.fields)
      return
    }
    this.loading = true;
    this.userService.updateAddress(
      this.fields.rua.value,
      this.fields.numero.value,
      this.fields.complemento.value,
      this.fields.bairro.value,
      this.fields.cidade.value,
      this.fields.estado.value,
      this.fields.cep.value,
      this.currentUser.user_id
    )
    .subscribe(address => {
      this.toast.success('Endereço salvo', "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      })
      this.loading = false
    })
  }

  onCheckout() {
    this.spinner.show().then(p => {
       this.cartService.CheckoutFromCart(1);
     });


   //console.log(this.checkoutForm.value);

   }

}
