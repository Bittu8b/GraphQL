import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "./Service/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isAuth: boolean = false;

  title = "frontend";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.checkStatus();
    }, 1000);
  }

  checkStatus() {
    if (this.authService.headerStatus()) {
      this.isAuth = true;
      console.log(this.isAuth);
    } else {
      console.log(this.authService.headerStatus());

      this.isAuth = false;
    }
  }

  logout() {
    this.authService.logout();
    this.isAuth = false;
  }
}
