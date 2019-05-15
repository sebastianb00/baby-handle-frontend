import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BebeComponent } from './bebe/bebe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BebeComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [BebeComponent]
})
export class ComponentsModule { }
