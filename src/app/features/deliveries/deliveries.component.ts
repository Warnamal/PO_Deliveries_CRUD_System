import { DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

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
  ],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css'
})
export class DeliveriesComponent implements OnInit {

  deliveries: any[] = [];
  selectedDelivery: any = null;
  nextId: number = 1;

  viewDialog: boolean = false;
  addEditDialog: boolean = false;
  deleteDialog: boolean = false;
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.loadDeliveries();
    this.nextId = Math.max(...this.deliveries.map(d => d.id), 0) + 1;
  }

  loadDeliveries() {
    this.deliveries = [
      {
        id: 1,
        grnNumber: 'GRN-001',
        receivedDate: new Date('2025-10-10'),
        receivedBy: 'Gayan',
        deliveredBy: 'Gayan Transport',
        remarks: 'All items received in good condition',
      },
      {
        id: 2,
        grnNumber: 'GRN-002',
        receivedDate: new Date('2025-10-12'),
        receivedBy: 'Sachini',
        deliveredBy: 'Sachini Logistics',
        remarks: 'Partial delivery - 2 items pending',
      },
      {
        id: 3,
        grnNumber: 'GRN-003',
        receivedDate: new Date('2025-11-03'),
        receivedBy: 'Hasitha',
        deliveredBy: 'Hasitha Couriers',
        remarks: 'Delivered on time',
      }
    ];
  }

  viewDelivery(delivery: any) {
    this.selectedDelivery = { ...delivery };
    this.viewDialog = true;
  }

  editDelivery(delivery: any) {
    this.isEditMode = true;
    this.selectedDelivery = { ...delivery };
    this.addEditDialog = true;
  }

  updateDelivery() {
    if (!this.selectedDelivery.grnNumber || !this.selectedDelivery.receivedDate ||
      !this.selectedDelivery.receivedBy || !this.selectedDelivery.deliveredBy) {
      alert('Please fill all required fields!');
    } else {

      const index = this.deliveries.findIndex(d => d.id === this.selectedDelivery.id);
      if (index !== -1) {
        this.deliveries[index] = { ...this.selectedDelivery };
        this.deliveries = [...this.deliveries]
      }

      this.addEditDialog = false;
      this.selectedDelivery = null;
      alert('Delivery updated successfully!')
    }

  }

  openAddDialog(): void {
    this.isEditMode = false;
    this.selectedDelivery = {
      id: 0,
      grnNumber: this.generateGRNNumber(),
      receivedDate: new Date(),
      receivedBy: '',
      deliveredBy: '',
      remarks: ''
    };
    this.addEditDialog = true;
  }

  generateGRNNumber() {
    const newGrn = this.nextId.toString().padStart(3, '0');
    return `GRN-${newGrn}`;
  }

  addDelivery(): void {
    if (!this.selectedDelivery.grnNumber || !this.selectedDelivery.receivedDate ||
      !this.selectedDelivery.receivedBy || !this.selectedDelivery.deliveredBy) {
      alert('Please fill all required fields!');
    } else {
      this.selectedDelivery.id = this.nextId;
      this.selectedDelivery.grnNumber = this.generateGRNNumber();
      this.nextId++;
      this.deliveries = [...this.deliveries, {...this.selectedDelivery}];

      this.addEditDialog = false;
      this.selectedDelivery = null;

      alert('Delivery added successfully!');
    }
  }

  deleteDelivery(delivery: any) {
    this.selectedDelivery = delivery;
    this.deleteDialog = true;
  }

  confirmDelete() {
    this.deliveries = this.deliveries.filter(d => d.id !== this.selectedDelivery.id);

    this.deleteDialog = false;
    this.selectedDelivery = null;
    alert('Delivery deleted successfully!');
  }





}
