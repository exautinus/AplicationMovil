// profile.page.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QrGeneratorService } from 'src/app/qr-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    materia: new FormControl('', Validators.required),
  });

  qrCodeData: string = '';
  isGeneratingQR: boolean = false;
  profesorInfo: any;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private qrGeneratorService: QrGeneratorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profesorInfo = this.utilsSvc.getFormLocalStorage('profesorInfo');
  }

  // Función para generar el código QR
  async generateQRCode() {
    if (this.profesorInfo && this.form.controls.materia.valid) {
      this.isGeneratingQR = true;

      try {
        // Incluye la materia seleccionada en el objeto profesorInfo
        this.profesorInfo.materia = this.form.value.materia;

        // Utiliza el servicio para generar la URL del código QR
        const url = await this.qrGeneratorService.generateQRCodeUrl(JSON.stringify(this.profesorInfo));
        this.qrCodeData = url;

        // Almacenar información del profesor en el almacenamiento local
        this.utilsSvc.saveInLocalStorage('profesorInfo', this.profesorInfo);


      } catch (err) {
        console.error('Error al generar el código QR:', err);
      } finally {
        this.isGeneratingQR = false;
      }
    }
  }

  // Función para cerrar la sesión del profesor
  signOut() {
    // Limpiar el código QR, reiniciar el formulario y cerrar la sesión
    this.qrCodeData = '';
    this.form.reset();
    this.form.controls.materia.setErrors(null);

    this.firebaseSvc.signOut();
  }

  // Función para manejar el envío del formulario
  async submit() {
    // Puedes agregar lógica adicional si es necesario
  }

  // Función para navegar a la página de historial
  navigateToScanHistory() {
    // Ajusta la ruta según la estructura de rutas de tu aplicación
    this.router.navigate(['/scan-history']);
  }

  verRegistroAsistencia() {
    // Ajusta la ruta según la estructura de rutas de tu aplicación
    this.router.navigate(['/verAsistencia']);
  }
  
}
