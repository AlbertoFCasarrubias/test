import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";

interface PageModel {
  users: User[] | null;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  pageModel: PageModel = {
    users: null,
  }
  constructor(private readonly userService: UserService,
              private readonly router: Router,
              public myapp: AppComponent,) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => this.pageModel.users = response as User[],
      error => console.error(error));
  }

  goTo(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

  add() {
    this.router.navigate([`/user`]);
  }

  async delete(id: number) {
    const resp = await this.myapp.doConfirm('Eliminar', '¿Estás seguro de eliminar este usuario?');
    if(!resp) {
      return;
    }

    this.userService.delete(id.toString()).subscribe((response) => {
      this.myapp.alert('Eliminar', 'El Usuario se elimino correctamente.');
      this.getUsers();
    });
  }
}
