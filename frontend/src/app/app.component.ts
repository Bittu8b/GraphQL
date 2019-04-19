import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './Service/auth.service';
import { Router } from '@angular/router';
import { NavbarService } from './Service/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  subscription: Subscription;

  title = 'frontend';

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.navbarService.loginStatus().subscribe(message => {
      this.isLoggedIn = message;
      console.log(this.isLoggedIn);
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.navbarService.updateLoginStatus(false);
    this.router.navigate(['auth']);
  }
}
