import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioAdminPage } from '../inicio-admin/inicio-admin';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-admin-controller.html'
})
export class TabsAdminControllerPage {

  tab1Root: any = InicioAdminPage;
  tab2Root: any = ChatPage;
  constructor(public navCtrl: NavController) {
  }
  
}
