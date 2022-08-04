import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Discount } from '../models/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private apiURL = `${environment.baseAPIURL}discount`;
  constructor(private http: HttpClient) { }

  addNewDiscount(discount: Discount) {
    return this.http.post(this.apiURL, discount);
  }
}
