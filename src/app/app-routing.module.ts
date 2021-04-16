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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
