import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto, ProductsResponse } from '../products/product';
import { HttpClient } from '@angular/common/http';

const fakeApi = "https://dummyjson.com/products";
const api = "https://localhost:7198/api/";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  controller = api + "products/";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>(this.controller + "all");
  }

  get(id: number): Observable<ProductDto> {
    return this.httpClient.get<ProductDto>(this.controller + id);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.controller + id);
  }
}
