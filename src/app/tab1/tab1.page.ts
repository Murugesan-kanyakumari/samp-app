import { Component } from '@angular/core';
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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  members: any[] = [];
  maleMembers = 0;
  femaleMembers = 0;

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.members = await this.getMembers();
    console.log('this.members ', this.members);
    this.maleMembers = this.members.filter(
      (data) => data.gender === 'Male'
    ).length;

    this.femaleMembers = this.members.filter(
      (data) => data.gender === 'Female'
    ).length;
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
}
