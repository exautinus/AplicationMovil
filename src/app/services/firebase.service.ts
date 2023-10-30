import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.mode';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  // {} -------AUTENTICATION---------- //

  //--------------Acceder-------------
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //--------------Crear usuario-------------
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //--------------Actualizar usuario-------------

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }



  // {} ------- BASE DE DATOS ---------- //

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);


  }

  // {} ------- Obtener un documento ---------- //
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

}
