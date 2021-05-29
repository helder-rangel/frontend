import { OrderService } from './../../services/order.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import {CartService} from "../../services/cart.service";
import { User } from '../../models/user.model';
import { AuthenticationService } from "../../services/auth.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: [];
  currentUser: User;
  panelOpenState = false;

  constructor(
    private route: Router,
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    ) {
      this.authenticationService.currentUser.subscribe(
        (user) => (this.currentUser = user)
      );
    }

  ngOnInit(): void {
    this.orderService.getAllOrderDetails().pipe(data => data).subscribe((result: any) => {
      this.orders = result
    })
  }

}
