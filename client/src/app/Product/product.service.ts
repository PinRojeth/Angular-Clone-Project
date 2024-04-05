import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EditProductData, Product, Products } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  baseUrl: string = 'http://localhost:3000/api/v1/products';
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Products> {
    return this.http.get<Products>(this.baseUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  updateProduct(id: string, data: any): Observable<EditProductData> {
    return this.http
      .patch<EditProductData>(`${this.baseUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
