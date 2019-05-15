import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Storage } from '@ionic/storage';
import { Bebe } from '../interfaces/bebe';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  correo: string;
  contrasena: string;

  constructor(private http: HttpClient, private storage: Storage) { }

  login(correo: string, contrasena: string) {
    const usuario = { correo, contrasena };

    return new Promise(resolve => {
      this.http.post(`${ URL }/encargado/login`, usuario).subscribe(res => {
        console.log(res);

        if (res) {
          // tslint:disable-next-line: no-string-literal
          this.guardarUsuario(res['correo'], res['contrasena']);
          resolve(true);
        } else {
          this.correo = null;
          this.contrasena = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  registro(usuario: Usuario) {
    return this.http.post(`${ URL }/encargado`, usuario).subscribe(res => {
      console.log(res);
    });
  }

  registroBebe(bebe: Bebe) {
    return this.http.post(`${ URL }/infante`, bebe).subscribe(res => {
      console.log(res);
    });
  }

  async guardarUsuario(correo: string, contrasena: string) {
    this.correo = correo;
    this.contrasena = contrasena;
    await this.storage.set('correo', correo);
    await this.storage.set('contrasena', contrasena);
  }
}
