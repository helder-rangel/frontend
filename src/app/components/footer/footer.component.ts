import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentUser: User;

  constructor( private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnInit(): void {
  }

}
