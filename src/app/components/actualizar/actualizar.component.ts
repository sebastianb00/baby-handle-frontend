import { Component, OnInit } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import {Usuario} from '../../interfaces/usuario';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss'],
})
export class ActualizarComponent implements OnInit {



  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController, private uIService: UiServiceService) { }

  ngOnInit() {}

  actualizarUser() {
    alert('Usuario actualizado');
  }

}
