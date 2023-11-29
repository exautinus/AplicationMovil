import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { QrGeneratorService } from './qr-generator.service'; // Ajusta la ruta según tu estructura de archivos

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ScanHistoryComponent } from 'src/app/shared/components/scan-history/scan-history.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent, 
    ScanHistoryComponent,
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: "md" }),
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule
    


  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    BarcodeScanner, 
    QrGeneratorService],
  bootstrap: [AppComponent],

})
export class AppModule { }
