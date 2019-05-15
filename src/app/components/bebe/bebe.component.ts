import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bebe } from '../../interfaces/bebe';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-bebe',
  templateUrl: './bebe.component.html',
  styles: [`
      img { width: 120px; }
      .pick-avatar { width: 120px; }
  `],
})
export class BebeComponent implements OnInit {

  registroBebe: Bebe = {
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    id: '',
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController, private uIService: UiServiceService) { }

  ngOnInit() {}

  async registrarBebe(fRegistro: NgForm) {
    if (fRegistro.invalid) { return ; }
    console.log(fRegistro.value);

    const valido = await this.usuarioService.registroBebe(this.registroBebe);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1');
    } else {
      this.uIService.alertaInformativa('Esa manilla ya se encuentra registrada. Verifique, por favor.');
    }
  }

}
