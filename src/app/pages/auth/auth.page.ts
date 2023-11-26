import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';  // Importa el servicio Router

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // Formulario para ingresar credenciales
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  // Servicios necesarios
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  // Inyecta el servicio Router en el constructor
  constructor(private router: Router) {}

  ngOnInit() {}

  // Manejar el evento de inicio de sesión
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilSvc.loading();
      await loading.present();

      // Iniciar sesión con Firebase
      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        // Obtener información del usuario después del inicio de sesión
        this.getUserInfo(res.user.uid);
      }).catch(error => {
        console.log(error);

        // Mostrar mensaje de error
        this.utilSvc.presentToast({
          message: error.message,
          duration: 3000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  // Obtener información del usuario desde Firebase
  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      // Obtener documento de Firebase
      this.firebaseSvc.getDocument(path).then((user: User) => {
        // Guardar el tipo de usuario en el Local Storage del navegador
        localStorage.setItem('userType', user.tipo);

        // Guardar información del usuario en el servicio local
        this.utilSvc.saveInLocalStorage('user', user);

        // Redirigir según el tipo de usuario
        this.redirectBasedOnUserType(user.tipo);

        // Reiniciar el formulario
        this.form.reset();

        // Mostrar mensaje de bienvenida
        this.utilSvc.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        });
      }).catch(error => {
        console.log(error);

        // Mostrar mensaje de error
        this.utilSvc.presentToast({
          message: error.message,
          duration: 3000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  // Redirigir según el tipo de usuario
  private redirectBasedOnUserType(userType: string) {
    // Ajustar las rutas según tus necesidades específicas
    switch (userType) {
      case 'A':
        this.router.navigate(['/main/home']);
        break;
      case 'P':
        this.router.navigate(['/main/profile']);
        break;
      // Agregar más casos según los tipos de usuario que tengas
      default:
        this.router.navigate(['/main/home']);
    }
  }
}
