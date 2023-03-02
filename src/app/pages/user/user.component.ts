import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as M from 'materialize-css';
import {AppComponent} from "../../app.component";

interface PageModel {
  user: User | null;
  id: string;
  update: boolean;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  pageModel: PageModel = {
    user: null,
    id: this.activatedRoute.snapshot.paramMap.get('id') as string,
    update: false,
  }

  userForm = new FormGroup({
    id: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    datos: new FormGroup({
      active: new FormControl('1'),
      address: new FormControl(''),
      balance: new FormControl(''),
      birthday: new FormControl(''),
      country: new FormControl(''),
      id:new FormControl(''),
      name: new FormControl(''),
      phone: new FormControl(''),
      size: new FormControl(''),
      user_id: new FormControl(''),
    })
  });

  constructor(private readonly userService: UserService,
              public myapp: AppComponent,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.initMaterialize();

    if (!this.pageModel.id) {
      return;
    }

    this.userService.getUser(this.pageModel.id).subscribe((response) => {
        this.pageModel.user = response as User;
        this.pageModel.update = true;
        this.userForm.patchValue(response);
        this.initMaterialize();
      },
      (error) => console.error(error))
  }

  private initMaterialize() {
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'));
      M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        format: 'yyyy-mm-dd'
      })

      const textAreas = document.querySelectorAll('textarea');
      textAreas.forEach(textArea => {
        M.textareaAutoResize(textArea);
      });
    });
  }

  setDate(event: any) {
    this.userForm.controls.datos.controls.birthday.patchValue(event.target.value);
  }
  submit() {
    console.log(this.userForm)
    if (!this.userForm.valid) {
      return;
    }

    if (this.pageModel.update) {
      this.userService.update(this.userForm.value.id as string, this.userForm.value).subscribe((response) => {
        this.myapp.alert('Guardar', 'El Usuario se guardo correctamente.')
      });
      return;
    }

    this.userService.save(this.userForm.value).subscribe((response) => {
      this.myapp.alert('Guardar', 'El Usuario se guardo correctamente.');
      this.router.navigate(['/users']);
    }, error => this.myapp.alert('Error', error.error));
  }
}
