import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { homeroutes } from "./home.routes";

import { AuthGuardService } from "../guards/auth-guard.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(homeroutes)],
  providers: [AuthGuardService]
})
export class HomeModule {}
