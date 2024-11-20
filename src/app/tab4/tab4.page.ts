import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserComponent } from '../components/edit-user/edit-user.component';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  constructor(
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  userData: any;

  ngOnInit() {
    const userDataString = localStorage.getItem('userDetails');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  async openEditUserModal() {
    const modal = await this.modalController.create({
      component: EditUserComponent,
      componentProps: {
        user: this.userData, // Pass the user data to the modal
      },
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        // Update the local user data if changes were saved
        this.userData = { ...this.userData, ...result.data };
        localStorage.setItem('userDetails', JSON.stringify(this.userData));
      }
    });

    await modal.present();
  }

  async deleteUser() {
    const alert = await this.alertController.create({
      header: 'LOGOUT',
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          text: 'LOGOUT',
          handler: async () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    localStorage.removeItem('userDetails'); // Clear user details
    localStorage.removeItem('expiryTime'); // Clear expiration time
    this.router.navigate(['/login']); // Redirect to login page
  }
}
