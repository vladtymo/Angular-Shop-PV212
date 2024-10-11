import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProductsService } from '../services/products.service';
import { ProductDto } from '../models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: ProductDto[] = [];

  constructor(private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }
  
}
