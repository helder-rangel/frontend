<<<<<<< HEAD
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'

import { RegisterComponent } from './register/register.component'
import { StoreComponent } from './store/store.component'
import { AuthGuard } from './guards/auth.guard'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AdminComponent } from './admin/admin.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/store',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGuard],
  },
  // {
  //   path: '',
  //   redirectTo: '/store',
  //   component: StoreComponent,
  //   pathMatch: 'full',
  // },
  { path: '**', component: PageNotFoundComponent },
]
=======
import { OrderComponent } from './components/order/order.component';
import { ThankyouComponent } from "./components/thankyou/thankyou.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { CartComponentComponent } from "./components/cart-component/cart-component.component";
import { ProductComponent } from "./components/product/product.component";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./helpers/auth.guard";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "product/:id",
    component: ProductComponent,
  },
  {
    path: "cart",
    component: CartComponentComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
  {
    path: "orders",
    component: OrderComponent,
  },
  {
    path: "thankyou",
    component: ThankyouComponent,
  },
  { path: "**", component: PageNotFoundComponent },
];
>>>>>>> master

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
<<<<<<< HEAD
  providers: [],
=======
>>>>>>> master
})
export class AppRoutingModule {}
