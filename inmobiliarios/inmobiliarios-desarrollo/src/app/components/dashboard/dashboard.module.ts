import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InmobiliariosComponent } from './inmobiliarios/inmobiliarios.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrearInmobiliarioComponent } from './inmobiliarios/crear-inmobiliario/crear-inmobiliario.component';
import { EditarInmobiliarioComponent } from './inmobiliarios/editar-inmobiliario/editar-inmobiliario.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InmobiliariosComponent,
    NavbarComponent,
    CrearInmobiliarioComponent,
    EditarInmobiliarioComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
