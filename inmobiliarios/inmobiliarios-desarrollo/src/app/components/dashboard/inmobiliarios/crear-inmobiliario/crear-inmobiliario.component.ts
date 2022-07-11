import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { InmobiliariosService } from 'src/app/services/inmobiliarios.service';
import { TypeRealState } from 'src/app/interfaces/type_real_state';
import { District } from 'src/app/interfaces/distritos';
import { Subscription } from 'rxjs';
import { WsService } from '../../../../ws.service';

@Component({
  selector: 'app-crear-inmobiliario',
  templateUrl: './crear-inmobiliario.component.html',
  styleUrls: ['./crear-inmobiliario.component.css']
})
export class CrearInmobiliarioComponent implements OnInit {


  public form: FormGroup;

  selected = 'Urbano';

  types : TypeRealState[] = [];
  districts : District[] = [];

  selectedEstado = '';


  constructor(private fb: FormBuilder,private wsService: WsService ,private router: Router, private service: InmobiliariosService) { 
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
    });
  }

  async ngOnInit(): Promise<void> {
     await this.service.getTypeRealState().subscribe(data=>{
       this.types = data;
     });
    await this.service.getDistricts().subscribe(data=>{
       this.districts = data;
     })
  }


  goBack() {
    this.router.navigate(['dashboard/inmobiliarios']);
  }

  public guardar() {
    this.service.agregaInmobiliario(this.form.value)
      .subscribe(data => {
        this.wsService.sendMessage("Agrega registro");
        this.goBack();
      })
  }

}
