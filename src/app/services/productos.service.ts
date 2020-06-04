import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  cargando = true;

  constructor(private http: HttpClient) {

    this.cargarproductos();

  }


  private cargarproductos() {

    return new Promise((resolve, reject) => {

      this.http
        .get('https://angular-html-68a64.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });
  }

  getProducto(id: string) {
    return this.http
      .get(`https://angular-html-68a64.firebaseio.com/productos/${id}.json`);
  }

  buscarProductos(termino: string) {

    if (this.productos.length === 0) {
      this.cargarproductos().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
    this.filtrarProductos(termino);

    }
  }

  filtrarProductos(termino: string) {

    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (
        prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrados.push(prod);
      }
    });
  }
}
