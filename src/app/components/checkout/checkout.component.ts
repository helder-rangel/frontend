import { BehaviorSubject } from 'rxjs';
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
import { Validations } from "../../helpers/validations";

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
  address;
  error = "";
  checkoutForm: any;
  requiredMsg = 'Campo é obrigatório';
  checkoutBtn = false;
  otherAddress = false;

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
    this.userService.getAdresses().subscribe(address => {
      const filterAddress = address.filter(add => add.user.id === this.currentUser.user_id)[0]
      this.address = filterAddress
    })
    this.addressForm = this.formBuilder.group({
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', ''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required, Validations.cepValidator]
    })
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  get fields() {
    return this.addressForm.controls;
  }

  handleAddress() {
    this.otherAddress = !this.otherAddress
  }

  updateAddressSubmit() {
    this.submittedAddress = true;
    if (this.addressForm.status === 'INVALID') {
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

  handleCheckbox() {
    this.checkoutBtn = !this.checkoutBtn
  }

  onCheckout() {
    this.spinner.show().then(p => {
      console.log(p)
     });
    this.cartService.CheckoutFromCart(this.currentUser.user_id);


   //console.log(this.checkoutForm.value);

   }

}
