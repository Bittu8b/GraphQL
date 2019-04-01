import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "./Service/auth.service";
import { Router } from "@angular/router";
import { NavbarService } from "./Service/navbar.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isAuth: boolean = false;

  links: Array<{ text: string; path: string }>;
  isLoggedIn = false;

  title = "frontend";

  constructor(private router: Router, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.links = this.navbarService.getLinks();
    this.navbarService
      .getLoginStatus()
      .subscribe(status => (this.isLoggedIn = status));

    console.log(this.isLoggedIn);
  }

  logout() {
    this.navbarService.updateLoginStatus(false);
    this.router.navigate(["auth"]);
  }
}
