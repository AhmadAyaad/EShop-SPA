import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = `${environment.baseAPIURL}products`
  constructor(private http: HttpClient) { }

  addNewProduct(newProduct: Product): Observable<any> {
    return this.http.post(this.apiURL, newProduct);
  }
  getProducts(pageIndex: string, pageSize: string): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageIndex);
    params = params.append('pageSize', pageSize);
    return this.http.get<Product[]>(this.apiURL, { params });
  }
  getFilterdProducts(filteredCategoriesIds:{}): Observable<any> {
    return this.http.post(`${this.apiURL}/filter-products-by-categories-ids`, filteredCategoriesIds);
  }
}
