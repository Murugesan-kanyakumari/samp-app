import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private firestore: Firestore, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  userData = { username: '', mobile: '', email: '', address: '', password: '' };

  async registerUser() {
    if (this.registerForm.invalid) {
      return;
    }
    const formValues = this.registerForm.value;
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        formValues.password,
        'muges@123'
      ).toString();

      const userRef = collection(this.firestore, 'users');
      await addDoc(userRef, {
        ...formValues,
        password: encryptedPassword,
        role: 'member',
      });

      console.log('User registered successfully!');
      this.registerForm.reset();
    } catch (error) {
      console.log('AddUserComponent error :: ', error);
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
