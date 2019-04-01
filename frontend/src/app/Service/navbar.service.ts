import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class NavbarService {
  private links = new Array<{ text: string; path: string }>();
  private isLoggedIn = new Subject<boolean>();

  constructor(private authService: AuthService) {
    this.addItem({ text: "Login", path: "login" });
    this.isLoggedIn.next(true);
  }

  getLinks() {
    this.isLoggedIn.next(true);
    return this.links;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);

    if (!status) {
      this.clearAllItems();
      this.addItem({ text: "Login", path: "login" });
    }
  }

  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: "Login" });

    this.addItem({ text: "User Board", path: "user" });

    this.addItem({ text: "Admin Board", path: "admin" });
  }

  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }
}
