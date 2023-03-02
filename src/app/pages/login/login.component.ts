import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AppComponent} from "../../app.component";
import {UserService} from "../../services/user/user.service";
import {tap} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validationsForm: FormGroup;
  visibility = false;
  errorMessage = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Email es obligatorio.' },
      { type: 'pattern', message: 'Favor de poner un email válido.' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es obligatorio.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 carácteres.' }
    ]
  };


  constructor(private router: Router,
              public myapp: AppComponent,
              private readonly userService: UserService,
              private formBuilder: FormBuilder) {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required]))
    });
  }

  ngOnInit(): void {
    if (this.userService.getStorageUser()) {
      this.goTo('users');
    }
  }

  tryLogin(value: any) {
    this.userService.login(value).subscribe((response: any) => {
      this.userService.setUser(response);
      this.goTo('users');
    }, error => {
      this.myapp.alert('Error', 'El mail y/o contraseña son incorrectos.')
    });
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }

  forgotPassword(){
    if(!this.validationsForm.value.email) {
      this.myapp.alert('Olvide la contraseña', 'Favor de escribir un correo electrónico.');
      return;
    }

  }

  toogleVisibility () {
    this.visibility = !this.visibility;
  }

}
