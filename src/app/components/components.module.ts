import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BebeComponent } from './bebe/bebe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActualizarComponent } from './actualizar/actualizar.component';

@NgModule({
  declarations: [BebeComponent, ActualizarComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [BebeComponent, ActualizarComponent]
})
export class ComponentsModule { }
