import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  profesorInfo: any;
  asistencia: any;

  constructor(private utilsSvc: UtilsService) {}

  ngOnInit() {
    // Recupera los datos almacenados en UtilsService
    this.asistencia = this.utilsSvc.getSharedData();
    
    // Muestra un mensaje en consola
    console.log('Datos de asistencia:', this.asistencia);

    // Verifica si hay datos o no
    if (!this.asistencia) {
      console.log('A la espera de un registro');
    }

    // También puedes recuperar otros datos si es necesario
    // this.profesorInfo = ...
  }
}
