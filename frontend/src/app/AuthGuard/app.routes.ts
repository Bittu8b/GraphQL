import { Routes } from "@angular/router";
import { AuthComponent } from "../components/auth/auth.component";
import { PagenotfoundComponent } from "../components/pagenotfound/pagenotfound.component";

export const APP_ROUTES: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "", redirectTo: "/events", pathMatch: "full" },
  { path: "**", component: PagenotfoundComponent }
];
