import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AuthenticationService } from "../../services/auth.service";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get fields() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log("this ", this.fields.email);
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.fields.email.value, this.fields.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
          
          localStorage.setItem('token', data.access_token);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
