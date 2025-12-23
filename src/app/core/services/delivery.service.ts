import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeliveryDto {
  id: string;
  grnNumber: string;
  receivedDate: Date;
  receivedBy: string;
  deliveredBy?: string;
  remarks?: string;
  purchaseOrderId: string;
  purchaseOrderNumber?: string;
}

export interface CreateDeliveryDto {
  purchaseOrderId: string;
  receivedDate: Date;
  receivedBy: string;
  deliveredBy?: string;
  remarks?: string;
}

export interface UpdateDeliveryDto {
  receivedDate: Date;
  receivedBy: string;
  deliveredBy?: string;
  remarks?: string;
}

export interface PurchaseOrderDto {
  id: string;
  poNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(private http: HttpClient) { }

  getAllDeliveries(): Observable<DeliveryDto[]>{
    return this.http.get<DeliveryDto[]>(`${environment.apiUrl}/Deliveries`); 
  }

  getDeliveryById(id: string): Observable<DeliveryDto>{
    return this.http.get<DeliveryDto>(`${environment.apiUrl}/Deliveries/${id}`); 
  }

  createDelivery(delivery: CreateDeliveryDto): Observable<DeliveryDto>{
    return this.http.post<DeliveryDto>(`${environment.apiUrl}/Deliveries`, delivery); 
  }

  updateDelivery(id: string, delivery: UpdateDeliveryDto): Observable<DeliveryDto>{
    return this.http.put<DeliveryDto>(`${environment.apiUrl}/Deliveries/${id}`, delivery); 
  }

  deleteDelivery(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Deliveries/${id}`); 
  }

  getPurchaseOrderDropDown(): Observable<PurchaseOrderDto[]>{
    return this.http.get<PurchaseOrderDto[]>(`${environment.apiUrl}/PurchaseOrders/dropdown`); 
  }
}