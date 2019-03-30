import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  login(cred) {
    return this.http.post("http://localhost:3000/graphql", cred);
  }

  getEvents(body, header) {
    return this.http.post("http://localhost:3000/graphql", body, header);
  }

  createEvent(body, header) {
    return this.http.post("http://localhost:3000/graphql", body, header);
  }
}
