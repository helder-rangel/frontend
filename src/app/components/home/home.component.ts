import { CartService } from './../../services/cart.service';
import { ProductModelServer, ServerResponse } from './../../models/product.model';

import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  data:any;
  products: ProductModelServer[] = []

  constructor(private productService: ProductService, private router:Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe( ( result: ServerResponse ) =>{
      
      
      console.log(result)
      this.data = result

    });
    
  }

  selectProduct(id: Number){
    this.router.navigate(['/product',id]).then();
  }

  
  AddProduct(id: number){
    this.cartService.AddProductToCart(id);

  }

}
