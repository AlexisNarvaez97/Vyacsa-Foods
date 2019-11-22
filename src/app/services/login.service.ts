import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storage: Storage) { }

  loginUser(email: string, password: string) {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(`${URL}/login`, formData);
  }


  getUsuarios() {
    return this.http.get(`${URL}/usuarios`);
  }

}
