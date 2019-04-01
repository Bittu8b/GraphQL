import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NavbarService {
  private is_logout = new Subject<boolean>();
  constructor() {}
}
