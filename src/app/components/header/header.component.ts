import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { CartService } from "./../../services/cart.service";
import { CartModelServer } from "./../../models/cart.model";
import { AuthenticationService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  currentUser: User;

  constructor(
    public cartService: CartService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });
    this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));
  }

  logout() {
    console.log("logout ======= ", this.currentUser);
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
