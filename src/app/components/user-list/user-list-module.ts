import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserListComponent } from './user-list.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [UserListComponent, EditUserComponent],
  exports: [UserListComponent, EditUserComponent],
})
export class UserListComponentModule {}
