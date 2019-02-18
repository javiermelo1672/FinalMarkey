import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { PedidosPage } from '../pedidos/pedidos';
import { NoticiasPage } from '../noticias/noticias';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = InicioPage;
  tab2Root: any = PedidosPage;
  tab3Root: any = NoticiasPage;
  tab4Root: any = PerfilPage;
  constructor(public navCtrl: NavController) {
  }
  
}
