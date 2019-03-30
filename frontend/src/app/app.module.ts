import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./components/auth/auth.component";
import { EventsComponent } from "./components/events/events.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { PagenotfoundComponent } from "./components/pagenotfound/pagenotfound.component";
import { HomeModule } from "./AuthGuard/home.module";
import { RouterModule } from "@angular/router";
import { APP_ROUTES } from "./AuthGuard/app.routes";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    EventsComponent,
    BookingsComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    RouterModule.forRoot(APP_ROUTES),
    HomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
