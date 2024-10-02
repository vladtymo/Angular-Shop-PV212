import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../products/product';
import { HttpClient } from '@angular/common/http';

const api = "https://dummyjson.com/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ProductsResponse> {
    return this.httpClient.get<ProductsResponse>(api);
  }
}
