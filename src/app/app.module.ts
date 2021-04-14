import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AngularTokenModule } from 'angular-token'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'

import { DemoMaterialModule } from './material-module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RegisterComponent } from './register/register.component'
import { StoreModule } from './model/store.module'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { LoginComponent } from './login/login.component'
import { AuthService } from './services/auth.service'
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ToolbarComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    StoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000/api',
      apiPath: null,

      signInPath: 'auth/sign_in',
      signInRedirect: null,
      signInStoredUrlStorageKey: null,

      signOutPath: 'auth/sign_out',
      validateTokenPath: 'auth/validate_token',
      signOutFailedValidate: false,

      registerAccountPath: 'auth',
      deleteAccountPath: 'auth',
      registerAccountCallback: window.location.href,

      updatePasswordPath: 'auth',
      resetPasswordPath: 'auth/password',
      resetPasswordCallback: window.location.href,

      oAuthBase: window.location.origin,
      oAuthPaths: {
        github: 'auth/github',
      },
      oAuthCallbackPath: 'oauth_callback',
      oAuthWindowType: 'newWindow',
      oAuthWindowOptions: null,
    }),
  ],
  providers: [AngularTokenModule, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
