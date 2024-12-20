import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() user: any;
  editForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private firestore: Firestore
  ) {}
  userData: any;

  ngOnInit() {
    const userDataString = localStorage.getItem('userDetails');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }

    this.editForm = this.fb.group(
      {
        username: [this.user.username, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        mobile: [this.user.mobile, Validators.required],
        gender: [this.user.gender || '', Validators.required],
        password: ['', Validators.minLength(6)],
        confirmPassword: [''],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async saveChanges() {
    if (this.editForm.valid) {
      // Create an object to hold the updated user data
      const updatedUser: any = {
        username: this.editForm.value.username,
        email: this.editForm.value.email,
        mobile: this.editForm.value.mobile,
        gender: this.editForm.value.gender,
      };

      // Only include the password if it has been updated
      if (this.editForm.value.password) {
        updatedUser.password = CryptoJS.AES.encrypt(
          this.editForm.value.password,
          'muges@123'
        ).toString();
      }

      try {
        const userDocRef = doc(this.firestore, 'users', this.user.id);
        await updateDoc(userDocRef, updatedUser);
        this.dismiss(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  dismiss(updatedUser?: any) {
    this.modalController.dismiss(updatedUser);
  }
}
