import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideLogin') slides: IonSlides;
  
  avatars: Avatar[] = [
    { img: 'av-3.png', seleccionado: true },
    { img: 'av-4.png', seleccionado: false },
    { img: 'av-1.png', seleccionado: false },
    { img: 'av-2.png', seleccionado: false },
  ];

  avatarSlide = { slidesPerView: 4 };

  loginUser: Usuario = { correo: '', contrasena: '' };

  registroUser: Usuario = {
    DNI: '',
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: ''
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController, private uIService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  onAvatar(avatar: Avatar) {
    this.avatars.forEach( av => av.seleccionado = false );
    avatar.seleccionado = true;
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarRegistroBebe() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    this.navCtrl.navigateRoot('/main/tabs/tab2', { animated: true });
    console.log(fLogin);
    const valido = await this.usuarioService.login(this.loginUser.correo, this.loginUser.contrasena);

    if (valido) {
      // Navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab2', { animated: true });
    } else {
      // Mostrar alerta de usuario y contraseña no correctos
      this.uIService.alertaInformativa('Correo y/o contraseña incorrectos. Verifique, por favor.');
    }
  }

  async registro(fRegistro: NgForm) {
    console.log(fRegistro);
    const valido = await this.usuarioService.registro(this.registroUser);

    if (valido) {
      // Navegar al tabs
      this.mostrarRegistroBebe();
    } else {
      // Mostrar alerta de usuario y contraseña no correctos
      this.uIService.alertaInformativa('Ese correo se encuentra registrado. Verifique, por favor.');
    }

  }

}

export interface Avatar {
  img: string;
  seleccionado: boolean;
}
