import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { EditUserComponent } from '../edit-user/edit-user.component';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  members: any[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';

  constructor(
    private modalController: ModalController,
    private firestore: Firestore,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadMembers();
  }

  filteredUsers() {
    return this.members.filter((user) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async editUser(user: any) {
    const modal = await this.modalController.create({
      component: EditUserComponent,
      componentProps: { user },
    });

    modal.onDidDismiss().then(() => {
      this.loadMembers();
    });

    await modal.present();
  }

  async loadMembers() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading users...',
    });
    await loading.present();

    try {
      this.members = await this.getMembers();
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      this.isLoading = false;
      loading.dismiss();
    }
  }

  async getMembers() {
    const userRef = collection(this.firestore, 'users');
    const memberQuery = query(userRef, where('role', '==', 'member'));
    const userSnapshot = await getDocs(memberQuery);
    const members = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return members;
  }

  async deleteUser(user: any) {
    const alert = await this.alertController.create({
      header: 'Delete User',
      message: `Are you sure you want to delete ${user.username}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await deleteDoc(doc(this.firestore, 'users', user.id));
              this.members = this.members.filter(
                (member) => member.id !== user.id
              );
              console.log('User deleted successfully');
            } catch (error) {
              console.error('Error deleting user:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
