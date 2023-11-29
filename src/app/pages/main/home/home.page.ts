import { Component, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  scannedData: any;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private barcodescanner: BarcodeScanner) {}

  ngOnInit() {
    // Puedes realizar inicializaciones adicionales aquí si es necesario
  }

  // Función para cerrar sesión
  signOut() {
    this.firebaseSvc.signOut();
  }

  // Función para escanear código QR
  scan() {
    this.barcodescanner.scan().then(async (barcodedata) => {
      console.log('Scaneando...', barcodedata);
      this.scannedData = barcodedata;

      // Enviar información al servidor o realizar otras acciones según tus necesidades
      this.sendAttendanceInfo();

    }).catch((err) => {
      console.log('ERROR AL ESCANEAR!!!!', err);
    });
  }

  // Función para enviar información de asistencia al servidor
  sendAttendanceInfo() {
    // Obtener información del profesor y materia desde el almacenamiento local
    const profesorInfo = this.utilsSvc.getFormLocalStorage('profesorInfo');
    const materiaSeleccionada = profesorInfo ? profesorInfo.materias[0] : '';

    // Construir objeto studentInfo con información del alumno
    const studentInfo = {
      nombre: 'Nombre del Estudiante',
      horaEscaneo: new Date().toLocaleTimeString(),
      scannedData: this.scannedData,
      nombreProfesor: profesorInfo ? profesorInfo.nombre : '',
      materia: materiaSeleccionada,
    };

    // Enviar información al componente de historial
    this.utilsSvc.saveInLocalStorage('studentInfo', studentInfo);
    this.navigateToScanHistory();
  }

  // Función para manejar el envío del formulario
  submit() {
    // Aquí puedes agregar lógica adicional si es necesario
  }

  // Función para navegar a la página de historial
  navigateToScanHistory() {
    // Ajusta la ruta según la estructura de rutas de tu aplicación
    this.utilsSvc.routerLink('/scan-history');
  }
}
