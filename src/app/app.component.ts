import { Component, ViewEncapsulation } from '@angular/core'
import { AngularTokenService } from 'angular-token'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(public tokenService: AngularTokenService) {}
  // title = 'ComIntegrada'
}
