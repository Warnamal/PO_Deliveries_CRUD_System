import { Routes } from '@angular/router';
import { PurchaseOrdersComponent } from './features/purchase-orders/purchase-orders.component';
import { DeliveriesComponent } from './features/deliveries/deliveries.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'purchaseOrders',
        pathMatch: 'full'
    },
    {
        path: 'purchaseOrders',
        component: PurchaseOrdersComponent
    },
    {
        path: 'deliveries',
        component: DeliveriesComponent
    }
];
