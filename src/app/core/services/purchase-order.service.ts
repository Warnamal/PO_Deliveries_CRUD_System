import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PurchaseOrderDto {
  id: string;
  poNumber: string;
  title: string;
  status: string;
  projectId: string;
  projectName?: string;
  supplierId: string;
  supplierName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  constructor(private http: HttpClient) { }

  getPurchaseOrders(): Observable<PurchaseOrderDto[]> {
    return this.http.get<PurchaseOrderDto[]>(`${environment.apiUrl}/PurchaseOrders`); 
  }

  getPurchaseOrderById(id: string): Observable<PurchaseOrderDto> {
    return this.http.get<PurchaseOrderDto>(`${environment.apiUrl}/PurchaseOrders/${id}`); 
  }
}