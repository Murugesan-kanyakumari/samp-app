import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  userData = { username: '', mobile: '', email: '', address: '', password: '' };

  async registerUser() {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        this.userData.password,
        'muges@123'
      ).toString();

      const userRef = collection(this.firestore, 'users');

      await addDoc(userRef, {
        ...this.userData,
        password: encryptedPassword,
        role: 'member',
      });

      console.log('User registered successfully!');
      this.userData = {
        username: '',
        mobile: '',
        email: '',
        address: '',
        password: '',
      };
    } catch (error) {
      console.log('AddUserComponent error :: ', error);
    }
  }
}
