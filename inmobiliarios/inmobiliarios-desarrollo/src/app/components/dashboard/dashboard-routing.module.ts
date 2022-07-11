import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InmobiliariosComponent } from './inmobiliarios/inmobiliarios.component';
import { CrearInmobiliarioComponent } from './inmobiliarios/crear-inmobiliario/crear-inmobiliario.component';
import { EditarInmobiliarioComponent } from './inmobiliarios/editar-inmobiliario/editar-inmobiliario.component';

const routes: Routes = [
  {path:'', component: DashboardComponent, children:[
    {path: '', component: InmobiliariosComponent},
    {path: 'inmobiliarios', component: InmobiliariosComponent},
    {path: 'crear_inmobiliario', component: CrearInmobiliarioComponent},
    {path: 'editar_inmobiliario/:id', component: EditarInmobiliarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
