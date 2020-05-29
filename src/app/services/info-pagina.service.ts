import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  info: InfoPagina = {};
  equipo: any [] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    // console.log('Servicios infoPagina cargado');
    this.CargarInfo();
    this.CargarEquipo();
  }

  private CargarInfo() {
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargando = false;
        this.info = resp;
      });
  }

  private CargarEquipo() {
    this.http
      .get('https://angular-html-68a64.firebaseio.com/equipo.json')
      .subscribe((resp: any[]) => {
        this.cargando = false;
        this.equipo = resp;
      });
  }
}
