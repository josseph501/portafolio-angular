import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-description.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  producto: ProductoDescripcion;
  id: string;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      this.productoService
        .getProducto(parametros['id'])
        .subscribe((producto: ProductoDescripcion) => {
          this.id = parametros['id'];
          this.producto = producto;
          this.cargando = false;
        });
    });
  }
}
