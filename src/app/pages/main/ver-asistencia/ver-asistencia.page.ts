// En tu ver-asistencia.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  asistencia: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  mostrarDatos() {
    const params = this.activatedRoute.snapshot.params;
    console.log('Params:', params);
  
    // Intenta acceder a 'state' directamente y verifica si es una cadena JSON válida
    const state = params['state'];
    if (state) {
      try {
        const parsedState = JSON.parse(state);
        console.log('Parsed State:', parsedState);
  
        // Verifica si 'asistencia' está definido en 'parsedState'
        if (parsedState && parsedState.asistencia) {
          console.log('Asistencia:', parsedState.asistencia);
  
          // Asigna los datos a la variable 'asistencia'
          this.asistencia = parsedState.asistencia;

          // Imprime cada objeto en la consola
          this.asistencia.forEach(item => console.log(item));
        }
      } catch (error) {
        console.error('Error al analizar el estado:', error);
      }
    }
  }

  ngOnInit() {
    // Llama a la función mostrarDatos() en el ngOnInit
    this.mostrarDatos();
  }
}
