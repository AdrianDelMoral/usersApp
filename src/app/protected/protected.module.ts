import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { UserComponent } from './pages/user/user.component';
import { ListComponent } from './pages/list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { UserTarjetComponent } from './components/tarjet/user-tarjet.component';

@NgModule({
  declarations: [
    UserComponent,
    ListComponent,
    HomeComponent,
    UserTarjetComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ProtectedRoutingModule,
    FormsModule
  ]
})
export class ProtectedModule { }
