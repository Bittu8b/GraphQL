import { Routes } from '@angular/router';
import { EventsComponent } from '../components/events/events.component';
import { BookingsComponent } from '../components/bookings/bookings.component';
import { AuthComponent } from '../components/auth/auth.component';
import { AuthGuardService } from '../guards/auth-guard.service';

export const homeroutes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'bookings',
    component: BookingsComponent,
    canActivate: [AuthGuardService]
  }
];
