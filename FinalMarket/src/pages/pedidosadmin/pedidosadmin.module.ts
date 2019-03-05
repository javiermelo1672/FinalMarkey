import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosadminPage } from './pedidosadmin';

@NgModule({
  declarations: [
    PedidosadminPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosadminPage),
  ],
})
export class PedidosadminPageModule {}
