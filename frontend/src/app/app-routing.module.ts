import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsComponent } from "./components/events/events.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { AuthComponent } from "./components/auth/auth.component";
import { PagenotfoundComponent } from "./components/pagenotfound/pagenotfound.component";

const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "auth", component: AuthComponent },
  { path: "pagenotfound", component: PagenotfoundComponent },
  { path: "**", redirectTo: "pagenotfound" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
