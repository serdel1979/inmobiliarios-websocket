import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { District } from 'src/app/interfaces/distritos';
import { Inmobiliario } from 'src/app/interfaces/inmobiliarios';
import { TypeRealState } from 'src/app/interfaces/type_real_state';
import { InmobiliariosService } from 'src/app/services/inmobiliarios.service';
import { WsService } from 'src/app/ws.service';

@Component({
  selector: 'app-editar-inmobiliario',
  templateUrl: './editar-inmobiliario.component.html',
  styleUrls: ['./editar-inmobiliario.component.css']
})
export class EditarInmobiliarioComponent implements OnInit {

  public form!: FormGroup;
  types: TypeRealState[] = [];
  districts: District[] = [];

  

  inmobiliario!: Inmobiliario;
  id!: string;
  inmobiliariosServices: any;

  constructor(private fb: FormBuilder,private wsocketService: WsService ,private rutaActiva: ActivatedRoute, private service: InmobiliariosService, private router: Router) {

  }

  async ngOnInit(): Promise<void> {


    await this.service.getTypeRealState().subscribe(data => {
      this.types = data;
    });
    await this.service.getDistricts().subscribe(data => {
      this.districts = data;
    })


    this.id = this.rutaActiva.snapshot.params['id'];
    this.form = this.fb.group({
      name: ['', Validators.required],
      type_real_state: ['', Validators.required],
      id_cou: [''],
      priority: [''],
      register_source: [''],
      current_state: [''],
      district: [''],
      id_mae: [''],
      holders_count: [''],
    })

    this.service.getInmobiliario(this.id).subscribe((data: Inmobiliario) => {
      this.inmobiliario = data;
      this.form.controls['name'].setValue(this.inmobiliario['name']);
      this.form.controls['type_real_state'].setValue(this.inmobiliario['type_real_state']);
      this.form.controls['id_cou'].setValue(this.inmobiliario['id_cou']);
      this.form.controls['priority'].setValue(this.inmobiliario['priority']);
      this.form.controls['register_source'].setValue(this.inmobiliario['register_source']);
      this.form.controls['current_state'].setValue(this.inmobiliario['current_state']);
      this.form.controls['district'].setValue(this.inmobiliario['district']);
      //this.dist.name = this.inmobiliario['district'];
    
      this.form.controls['id_mae'].setValue(this.inmobiliario['id_mae']);
      this.form.controls['holders_count'].setValue(this.inmobiliario['holders_count']);

    });
  }


  goBack() {
    this.router.navigate(['dashboard/inmobiliarios']);
  }

  public guardar() {
    this.service.editaInmobiliario(this.form.value, this.id)
      .subscribe(data => {
        this.wsocketService.sendMessage("edit");
        this.goBack();
      });
      
  }

  public comparaDistrict(dist1: any, dist2: any) {
    if (dist1.name == dist2.name && dist1.id == dist2.id)
      return true;
    else return false;
  }

  public comparaType(type1: any, type2: any) {
    if (type1.description == type2.description && type1.id == type2.id)
      return true;
    else return false;
  }

}
