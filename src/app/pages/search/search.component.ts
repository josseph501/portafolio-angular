import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public productoService: ProductosService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.productoService.buscarProductos(params['termino']);
      });
  }

}
