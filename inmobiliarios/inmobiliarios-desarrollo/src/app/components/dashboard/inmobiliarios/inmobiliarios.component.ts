import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Inmobiliario } from 'src/app/interfaces/inmobiliarios';
import { InmobiliariosService } from 'src/app/services/inmobiliarios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { Observable, Subscription } from 'rxjs';
import { TypeRealState } from 'src/app/interfaces/type_real_state';
import { WsService } from 'src/app/ws.service';

@Component({
  selector: 'app-inmobiliarios',
  templateUrl: './inmobiliarios.component.html',
  styleUrls: ['./inmobiliarios.component.css']
})
export class InmobiliariosComponent implements OnInit{

  listInmobiliarios: Inmobiliario[] = [];
  inmobiliario!: Inmobiliario;
  type_real_state: TypeRealState[] = [];

  suscription!: Subscription;

  displayedColumns: string[] = ['nombre', 'distrito','tipo', 'estado', 'idCou', 'idMae', 'Acciones'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  


  constructor(public dialogo: MatDialog, private wsocketService: WsService ,public inmobiliariosServices: InmobiliariosService, private _snackBar: MatSnackBar, private router: Router) { }
  

  ngOnInit(): void {
    this.wsocketService.listen('signal').subscribe((data:any)=>{
      console.log(data);
      this.cargarDatos();
    })
    this.cargarDatos();
  }

  cargarDatos() {
    this.inmobiliariosServices.getInmobiliarios().subscribe(data => {
      this.dataSource = new MatTableDataSource<Inmobiliario>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  crearInmobiliario() {
    console.log("crear");
  }


  mostrarDialogo(id:string): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Seguro de borrar el registro inmobiliario?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.borraInmobiliario(id);
        } 
      });
  }

  async borraInmobiliario(id: string):Promise<void>{
   await this.inmobiliariosServices.deleteInmobiliario(id).subscribe(() => {
      this.wsocketService.sendMessage("Eliminado");
      this.cargarDatos();
    },
    err => {
      this._snackBar.open(err.error.message,"Fail", {
        duration: 3000,
        horizontalPosition: 'center'
      });
      return;
    }),
    this._snackBar.open("Registro eliminado", "Siccess", {
      duration: 1500,
      horizontalPosition: 'center'
    });
  }



  editarInmobiliario(id: string) {
    this.router.navigate([`/dashboard/editar_inmobiliario/${id}`]);
  }


}
