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
    path: "thankyou",
    component: ThankyouComponent,
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
