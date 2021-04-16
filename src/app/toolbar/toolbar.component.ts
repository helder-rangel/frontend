import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']))
  }

  ngOnInit(): void {
    console.log('authService ', this.authService)
  }
}
