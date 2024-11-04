import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUserComponent } from './add-user.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [AddUserComponent],
  exports: [AddUserComponent],
})
export class AddUserComponentModule {}
