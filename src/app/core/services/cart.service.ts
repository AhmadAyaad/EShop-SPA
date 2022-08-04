import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiURL = `${environment.baseAPIURL}`;
  constructor(private http: HttpClient) { }
  getCartProducts(productsIds: number[]): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiURL}products/products-by-ids`, productsIds);
  }
  getDiscountByProductId(productId: number) {
    return this.http.get(`${this.apiURL}discount/${productId}`);
  }
  placeOrder(order: any) {
    return this.http.post(`${this.apiURL}orders/place-order`, order);
  }
}
