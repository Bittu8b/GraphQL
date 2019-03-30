import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _router: Router) {}

  clear(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }

  login(token) {
    localStorage.setItem("token", token);
    this._router.navigate(["/events"]);
  }

  logout(): void {
    this.clear();
    this._router.navigate(["/auth"]);
  }
}
