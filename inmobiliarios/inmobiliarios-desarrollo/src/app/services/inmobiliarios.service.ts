import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { elementAt, Subject, Observable } from 'rxjs';
import { Inmobiliario } from '../interfaces/inmobiliarios';
import { TypeRealState } from '../interfaces/type_real_state';
import { District } from '../interfaces/distritos';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InmobiliariosService {

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  getRefresh$(){
    return this._refresh$.asObservable();
  }


  AllInmobiliarios: Inmobiliario[] = [];

  getInmobiliarios(): Observable<Inmobiliario[]>{
    return this.http.get<Inmobiliario[]>('http://localhost:3000/api/v1/real_state');
  }

  getTypeRealState(): Observable<TypeRealState[]>{
    return this.http.get<TypeRealState[]>('http://localhost:3000/api/v1/real_state/type_real_state');
  }
   

  getDistricts(): Observable<District[]>{
    return this.http.get<District[]>('http://localhost:3000/api/v1/real_state/districts');
  }

  agregaInmobiliario(inmobiliario: Inmobiliario){
    return this.http.post<Inmobiliario>('http://localhost:3000/api/v1/real_state', inmobiliario);
  }

  editaInmobiliario(inmobiliario: Inmobiliario, id:string){
    return this.http.put<Inmobiliario>(`http://localhost:3000/api/v1/real_state/${id}`, inmobiliario);
  }


  getInmobiliario(id:string): Observable<Inmobiliario>{
    return this.http.get<Inmobiliario>(`http://localhost:3000/api/v1/real_state/${id}`);
  }

  deleteInmobiliario(id:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/api/v1/real_state/${id}`);
  }


}
