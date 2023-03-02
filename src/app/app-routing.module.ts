import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from "./pages/users/users.component";
import {GuardGuard} from "./services/guard/guard.guard";
import {UserComponent} from "./pages/user/user.component";

const routes: Routes = [
  { path: 'login', children: [{ path: '', component: LoginComponent }] },
  { path: 'users', component: UsersComponent, canActivate: [GuardGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [GuardGuard] },
  { path: 'user', component: UserComponent, canActivate: [GuardGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
