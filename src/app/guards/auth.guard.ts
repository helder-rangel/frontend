import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AngularTokenService } from 'angular-token'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authTokenService: AngularTokenService,
    private router: Router
  ) {}

  canActivate() {
    console.log('--------------> his.authTokenService ', this.authTokenService)
    if (this.authTokenService.userSignedIn()) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}
