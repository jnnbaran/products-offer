import { Injectable } from '@angular/core';
import {map, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "./types/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://wpmyaccountapi.assecobs.pl/api/products'
  loadingStateChange = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getProduct(productId: string){
    return this.http.get<Product>(`${this.apiUrl}/${productId}`)
  }

}
