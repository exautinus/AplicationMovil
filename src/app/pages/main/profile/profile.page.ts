// En tu profile.page.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  profesorInfo: any;

  predefinedQrCodeData: string = '';

  materiaImagenes: Record<string, string> = {
    Lenguaje: 'assets/img/Lenguaje.jpg',
    Matematica: 'assets/img/Matematicas.jpg',
    Historia: 'assets/img/Historia.jpg',
  }

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profesorInfo = this.utilsSvc.getFormLocalStorage('profesorInfo');
  }

  // Función para cerrar la sesión del profesor
  signOut() {
    // Limpiar el formulario y cerrar la sesión
    this.form.reset();
    
    this.firebaseSvc.signOut();
    this.predefinedQrCodeData = '';
  }

  
  async submit() {
  }

  // Función para mostrar la imagen prediseñada del código QR asociado
  showPredefinedQRCode() {

 // Obtén la materia seleccionada
 const selectedMateria = this.form.controls.materia.value;

 // Asigna la ruta de la imagen prediseñada al código QR según la materia seleccionada
 this.predefinedQrCodeData = this.materiaImagenes[selectedMateria] || '';

  }

  // Función para manejar el cambio de materia en la lista desplegable
  // Limpiar la ruta de la imagen prediseñada al cambiar la materia 
  onMateriaChange(){
    this.predefinedQrCodeData = '';
  }

  // Función para navegar a la página de ver asistencia (si hay una imagen generada)
  verRegistroAsistencia() {
    if (this.predefinedQrCodeData) {
      // Ajusta la ruta según la estructura de rutas de tu aplicación
      this.router.navigate(['/verAsistencia']);
    }
  }

}
