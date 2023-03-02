import {EventEmitter, Input, Output} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() title = '';
  @Input() message = '';
  @Input() confirm = false;
  @Input() showLicense = false;
  @Input() buttons = ['Aceptar', 'Cancelar'];
  instance: any;
  actionButton: any;
  license = '';

  constructor() {}

  ngOnInit(): void {

  }

  open() {
    M.Modal.init(document.querySelectorAll('.modal'));
    this.instance = M.Modal.getInstance(document.getElementById('modal1')!);
    this.instance.open();
  }

  doConfirm() {
    return new Promise(async (resolve) => {
      M.Modal.init(document.querySelectorAll('.modal'), {
        onCloseEnd: () => {
          resolve(this.actionButton);
        }
      });
      this.instance = M.Modal.getInstance(document.getElementById('modal1')!);
      this.instance.open();
    });

  }

  setAction(action: any, button: any) {
    this.actionButton = action;
    this.action.emit({action, license: this.license});
  }

}
