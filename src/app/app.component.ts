import { Component } from '@angular/core';
import {AlertComponent} from "./components/alert/alert.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  message = ''
  confirm = false;
  confirmResp: any;
  loading = false;
  showLicense = false;
  license = '';
  buttons = ['Aceptar', 'Cancelar'];

  constructor(private alertComponent: AlertComponent) {}

  alert(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.confirm = false;
    this.showLicense = false;
    this.buttons = ['Aceptar', 'Cancelar'];
    this.alertComponent.actionButton = undefined;

    this.alertComponent.open();
  }

  async doConfirm(title: string, message: string, showLicense = false, buttons:[any, any] = ['Aceptar', 'Cancelar']) {
    this.title = title;
    this.message = message;
    this.confirm = true;
    this.showLicense = showLicense;
    this.buttons = buttons;
    this.alertComponent.actionButton = undefined;

    await this.alertComponent.doConfirm();
    return this.confirmResp;
  }

  alertAction(event: any){
    this.license = event.license;
    this.confirmResp = event.action;
  }
}
