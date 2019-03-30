import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProjectService } from "src/app/Service/project.service";
import { AuthService } from "src/app/Service/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  switch_to = "Login";
  profileForm: FormGroup;

  authData: any;

  constructor(
    private service: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      userid: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.profileForm.value.userid, this.profileForm.value.password);
    const cred = {
      query: `query{login(email:"${this.profileForm.value.userid}",password:"${
        this.profileForm.value.password
      }"){userId token}}`
    };
    this.service.login(cred).subscribe(authdata => {
      this.authData = authdata;
      console.log(this.authData.data.login.token);
      this.authService.login(this.authData.data.login.token);
    });
  }

  // toggleButton(param) {
  //   if (param == "Login") {
  //     this.switch_to = "Register";
  //   } else if (param == "Register") {
  //     this.switch_to = "Login";
  //   } else {
  //     this.switch_to = "Munchurian";
  //   }
  // }
}
