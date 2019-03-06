import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InicioPage } from '../pages/inicio/inicio';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { PerfilPage } from '../pages/perfil/perfil';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { NoticiasPage } from '../pages/noticias/noticias';
import { IniciarSesiNPage } from '../pages/iniciar-sesi-n/iniciar-sesi-n';
import { CrearCuentaPage } from '../pages/crear-cuenta/crear-cuenta';
import { EditarCuentaPage } from '../pages/editar-cuenta/editar-cuenta';
import { AAdirTarjetaPage } from '../pages/a-adir-tarjeta/a-adir-tarjeta';
import { PaquetesPage } from '../pages/paquetes/paquetes';
import { DetallePaquetePage } from '../pages/detalle-paquete/detalle-paquete';


import { TabsAdminControllerPage } from '../pages/tabs-admin-controller/tabs-admin-controller';
import { InicioAdminPage } from '../pages/inicio-admin/inicio-admin';
import { ChatPage } from '../pages/chat/chat';
import { AAdirPaquetePage } from '../pages/a-adir-paquete/a-adir-paquete';
import { EditarProveedorPage } from '../pages/editar-proveedor/editar-proveedor';
import { AAdirProveedorPage } from '../pages/a-adir-proveedor/a-adir-proveedor';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { HolaAdministradorAPage } from '../pages/hola-administrador-a/hola-administrador-a';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {FIREBASE_CONFIG} from './app.firebase.config';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire'; 
import {AngularFireAuthModule} from "@angular/fire/auth";
import {HttpModule} from '@angular/http';

import { NoticiasService } from './../services/NoticiasService/noticias_service';
import { PromocionesService } from './../services/PromocionesService/promociones_service';
import { ProveedoresService } from './../services/Proveedores/proveedores_service';
import{UserService} from './../services/UserService.ts/user_service';
import{PedidosService} from './../services/Proveedores/pedidos_service';
import { PaquetesService } from './../services/Proveedores/paquetes_service';
import {UTarjetasService} from './../services/TarjetasService/tarjeta_service';
import {AlertasService} from './../services/Native_Services/Alertas/alertas_service';
@NgModule({
  declarations: [
    MyApp,
    InicioPage,
    PedidosPage,
    PerfilPage,
    TabsControllerPage,
    NoticiasPage,
    IniciarSesiNPage,
    CrearCuentaPage,
    EditarCuentaPage,
    AAdirTarjetaPage,
    DetallePaquetePage,
    InicioAdminPage,
    ChatPage,
    AAdirPaquetePage,
    EditarProveedorPage,
    AAdirProveedorPage,
    EditarPerfilPage,
    HolaAdministradorAPage,
    TabsAdminControllerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage,
    PedidosPage,
    PerfilPage,
    TabsControllerPage,
    NoticiasPage,
    IniciarSesiNPage,
    CrearCuentaPage,
    EditarCuentaPage,
    AAdirTarjetaPage,
    DetallePaquetePage,
    InicioAdminPage,
    ChatPage,
    AAdirPaquetePage,
    EditarProveedorPage,
    AAdirProveedorPage,
    EditarPerfilPage,
    HolaAdministradorAPage,
    TabsAdminControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoticiasService,
    PromocionesService,
    ProveedoresService,
    UserService,
    PedidosService,
    PaquetesService,
    UTarjetasService,
    AlertasService
    
  ]
})
export class AppModule {}