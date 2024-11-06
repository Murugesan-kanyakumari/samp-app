import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { User } from 'src/app/types/interface/core.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit() {}

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
  }

  async onLogin() {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const snapshot = await getDocs(usersCollection);
      const usersList: User[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      const user = usersList.find((u: any) => u.username === this.username);
      if (user) {
        const encryptedPassword = user.password;
        const decryptedPassword = CryptoJS.AES.decrypt(
          encryptedPassword,
          'muges@123'
        ).toString(CryptoJS.enc.Utf8);

        if (this.password === decryptedPassword) {
          const expiryTime = new Date().getTime() + 60 * 60 * 1000;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem(
            'userDetails',
            JSON.stringify({
              id: user.id,
              username: user.username,
              role: user.role,
              email: user.email,
              address: user.address,
            })
          );
          localStorage.setItem('expiryTime', expiryTime.toString());

          this.router.navigate(['/tabs']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
      alert('An error occurred while logging in. Please try again.');
    }
  }
}
