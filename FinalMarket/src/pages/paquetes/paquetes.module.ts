import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaquetesPage } from './paquetes';

@NgModule({
  declarations: [
    PaquetesPage,
  ],
  imports: [
    IonicPageModule.forChild(PaquetesPage),
  ],
})
export class PaquetesPageModule {}
