import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { CreateDeliveryDto, DeliveryService, UpdateDeliveryDto } from '../../core/services/delivery.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-deliveries',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    DatePipe,
    DialogModule,
    NgIf,
    ButtonDirective,
    Ripple,
    InputTextModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css'
})
export class DeliveriesComponent implements OnInit {

  deliveries: any[] = [];
  purchaseOrders: any[] = [];
  selectedDelivery: any = null;
  nextId: number = 1;

  viewDialog: boolean = false;
  addEditDialog: boolean = false;
  deleteDialog: boolean = false;
  isEditMode: boolean = false;
  loading: boolean = false;

  private deliveryService = inject(DeliveryService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadPurchaseOrders();
    this.loadDeliveries();
    this.nextId = Math.max(...this.deliveries.map(d => d.id), 0) + 1;
  }

  loadPurchaseOrders() {
    this.deliveryService.getPurchaseOrderDropDown().subscribe({
      next: (data) => {
        this.purchaseOrders = data.map(po => ({
          label: po.poNumber,
          value: po.id
        }));
      }
    });    
  }

  loadDeliveries() {
  this.loading = true;
  this.deliveryService.getAllDeliveries().subscribe({
    next: (data) => {
      this.deliveries = data.map(d => ({
        ...d,
        receivedDate: new Date(d.receivedDate),
        purchaseOrder: d.purchaseOrderNumber || d.purchaseOrderId
      }));
      this.loading = false;
    },
    error: (error) => {
      console.error('Full error:', error); 
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load deliveries!'
      });
    }
  })
}

  viewDelivery(delivery: any) {
    this.selectedDelivery = { ...delivery };
    this.viewDialog = true;
  }

  editDelivery(delivery: any) {
    this.isEditMode = true;
    this.selectedDelivery = { 
      ...delivery,
      grnNumber: delivery.grnNumber,
      receivedDate: new Date(delivery.receivedDate) 
    };
    this.addEditDialog = true;
  }

  updateDelivery() {
    if (!this.selectedDelivery.receivedDate ||
      !this.selectedDelivery.receivedBy || 
      !this.selectedDelivery.deliveredBy) {
        this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill all required fields!'
      });
      return;
    } 

    const updateDto: UpdateDeliveryDto = {
      receivedDate: this.selectedDelivery.receivedDate,
      receivedBy: this.selectedDelivery.receivedBy,
      deliveredBy: this.selectedDelivery.deliveredBy,
      remarks: this.selectedDelivery.remarks || ''
    };

    this.loading = true;
    this.deliveryService.updateDelivery(this.selectedDelivery.id, updateDto).subscribe({
      next: (updateDelivery) => {
        this.loadDeliveries();
        this.addEditDialog = false;
        this.selectedDelivery = null;
        this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Delivery updated successfully!'
      });
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update delivery! + error.message'
      });
      this.loading = false;
      }
    });
  }

  openAddDialog(): void {
    this.isEditMode = false;
    this.selectedDelivery = {
      grnNumber: '',
      receivedDate: new Date(),
      receivedBy: '',
      deliveredBy: '',
      remarks: '',
      purchaseOrderId: null
    };
    this.addEditDialog = true;
  }

  addDelivery(): void {
    if (!this.selectedDelivery.receivedDate ||
      !this.selectedDelivery.receivedBy || 
      !this.selectedDelivery.deliveredBy ||
      !this.selectedDelivery.purchaseOrderId) {
        this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill all required fields!'
      });
      return;
    } 

    const createDto: CreateDeliveryDto = {
      purchaseOrderId: this.selectedDelivery.purchaseOrderId,
      receivedDate: this.selectedDelivery.receivedDate,
      receivedBy: this.selectedDelivery.receivedBy,
      deliveredBy: this.selectedDelivery.deliveredBy,
      remarks: this.selectedDelivery.remarks || ''
    };

    this.loading = true;
    this.deliveryService.createDelivery(createDto).subscribe({
      next: (newDelivery) => {
        this.addEditDialog = false;
        this.selectedDelivery = null;
        this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Delivery added successfully!'
      });
        this.loading = false;
        window.location.reload();
      },
      error: (error) => {
        this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to add delivery!'
      });
      this.loading = false;
      }
    })
  }

  deleteDelivery(delivery: any) {
    this.selectedDelivery = delivery;
    this.deleteDialog = true;
  }

  confirmDelete() {
    debugger;
    this.loading = true;
    this.deliveryService.deleteDelivery(this.selectedDelivery.id).subscribe({
      next: () => {
        this.loadDeliveries();
        this.deleteDialog = false;
        this.selectedDelivery = null;
        this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Delivery deleted successfully!'
      });
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load deliveries!'
      });
      this.loading = false;
      }
    })
  }
}
