import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [ CardModule, TableModule ],
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent implements OnInit {

  purchaseOrders: any[] = [];

  ngOnInit(): void {
    this.loadPODeliveries();
  }

  loadPODeliveries(): void {
    this.purchaseOrders = [
      { 
        poNumber: 'PO-001', 
        title: 'Office Supplies Purchase', 
        status: 'Pending', 
      },
      { 
        poNumber: 'PO-002', 
        title: 'Cement Order', 
        status: 'Approved', 
      },
      { 
        poNumber: 'PO-003', 
        title: 'Construction Materials', 
        status: 'Delivered', 
      },
      { 
        poNumber: 'PO-004', 
        title: 'Furniture Purchase', 
        status: 'Cancelled', 
      }
    ];
  }

}
