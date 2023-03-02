import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null = null;
  private api = 'http://localhost:8000/api/v1';
  constructor(private http: HttpClient) { }

  login(payload: {email: string, password: string}) {
    return this.http.post(`${this.api}/login`, payload);
  }

  getUsers() {
    return this.http.get(`${this.api}/users`);
  }

  getUser(id: string) {
    return this.http.get(`${this.api}/users/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/users/${id}`);
  }

  save(payload: any) {
    return this.http.post(`${this.api}/users`, this.parsePayload(payload));
  }

  update(id:string, payload: any) {
    return this.http.put(`${this.api}/users/${id}`, this.parsePayload(payload));
  }

  setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getStorageUser() {
    const storage = localStorage.getItem('user')
    if (!this.user && storage) {
      this.user = JSON.parse(storage);
    }
    return this.user;
  }

  private parsePayload(payload: any) {
    const resp = payload;
    resp.active = payload.datos.active;
    resp.address = payload.datos.address;
    resp.balance = payload.datos.balance;
    resp.birthday = payload.datos.birthday;
    resp.country = payload.datos.country;
    resp.name = payload.datos.name;
    resp.phone = payload.datos.phone;
    resp.size = payload.datos.size;
    resp.user_id = payload.datos.user_id;

    return resp;
  }
}
