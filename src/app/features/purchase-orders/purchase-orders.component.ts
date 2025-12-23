import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PurchaseOrderDto } from '../../core/services/delivery.service';
import { PurchaseOrderService } from '../../core/services/purchase-order.service';

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [ 
    CommonModule,
    CardModule, 
    TableModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrders: PurchaseOrderDto[] = [];
  loading: boolean = false;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPODeliveries();
  }

  loadPODeliveries(): void {
    this.loading = true;
    this.purchaseOrderService.getPurchaseOrders().subscribe({
      next: (data) => {
        this.purchaseOrders = data;
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Purchase orders loaded successfully'
        });
      },
      error: (error) => {
        console.error('Error loading purchase orders:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load purchase orders'
        });
      }
    });
  }

  getPurchaseOrderById(id: string): void {
    this.purchaseOrderService.getPurchaseOrderById(id).subscribe({
      next: (data) => {
        console.log('Purchase Order Details:', data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Loaded ${data.poNumber}`
        });
      },
      error: (error) => {
        console.error('Error loading purchase order:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Purchase order not found'
        });
      }
    });
  }
}