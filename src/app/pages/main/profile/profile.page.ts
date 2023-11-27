import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // Formulario para la página del perfil del profesor
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    materia: new FormControl('', Validators.required), // Campo de la materia con validación requerida
  });

  // Servicios inyectados
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  // Datos del código QR generado
  qrCodeData: string = '';

  // Estado para controlar el proceso de generación del código QR
  isGeneratingQR: boolean = false;

  ngOnInit() {}

  // Función para generar el código QR
  generateQRCode() {
    // Verificar si se ha seleccionado una materia antes de generar el QR
    if (this.form.controls.materia.valid) {
      this.isGeneratingQR = true;

      // Lógica para generar el código QR
      const profesorInfo = {
        id: 1,
        nombre: 'Nombre del Profesor',
        horaGeneracion: new Date().toLocaleTimeString(),
        materias: [this.form.value.materia],
        // Otros datos relevantes del profesor
      };

      // Limpiar el código QR anterior si lo hay
      this.qrCodeData = '';

      // Generar el código QR y actualizar qrCodeData
      QRCode.toDataURL(JSON.stringify(profesorInfo), (err, url) => {
        if (err) {
          console.error('Error al generar el código QR:', err);
        } else {
          this.qrCodeData = url;
        }
        this.isGeneratingQR = false;
      });
    }
  }

  // Función para cerrar la sesión del profesor
  signOut() {
    this.qrCodeData = ''; //limpia el codigo QR
    this.form.reset(); //reinicia la función
    this.form.controls.materia.setErrors(null); //reinicia la validacion

    this.firebaseSvc.signOut(); //cierra sesion
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then((res) => {
        this.utilsSvc.presentToast({
          message: 'Correo enviado con éxito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline',
        });

        this.utilsSvc.routerLink('/auth');
        this.form.reset();
      }).catch((error) => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 3000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
}
