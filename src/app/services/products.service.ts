import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel, CreateProductModel, EditProductModel, ProductDto, ProductsResponse } from '../models/product';
import { HttpClient } from '@angular/common/http';

const fakeApi = "https://dummyjson.com/products";
const myApi = "https://localhost:7198/api/";
const azureApi = "https://shop-pd212.azurewebsites.net/api/";
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

  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.controller + "categories");
  }

  get(id: number): Observable<ProductDto> {
    return this.httpClient.get<ProductDto>(this.controller + id);
  }

  create(model: CreateProductModel): Observable<any> {
    return this.httpClient.post(this.controller, model);
  }

  edit(model: EditProductModel): Observable<any> {
    return this.httpClient.put(this.controller, model);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.controller + id);
  }
}
