import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL = `${environment.baseAPIURL}category`
  constructor(private httpClient: HttpClient) { }
  getCategories() {
    return this.httpClient.get<Category[]>(`${this.apiURL}`);
  }
}
