import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;

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
    this.isLoggedIn = true;
    localStorage.setItem("token", token);
    this._router.navigate(["/events"]);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.clear();
    this._router.navigate(["/auth"]);
  }

  headerStatus(): boolean {
    return this.isLoggedIn;
  }
}
