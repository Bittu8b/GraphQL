import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Options } from "selenium-webdriver/edge";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  login(cred) {
    return this.http.post("http://localhost:3000/graphql", cred);
  }

  getEvents(body, header) {
    return this.http.post("http://localhost:3000/graphql", body, {
      headers: header
    });
  }

  createEvent(body, header) {
    return this.http.post("http://localhost:3000/graphql", body, {
      headers: header
    });
  }
}
