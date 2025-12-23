import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PO_Deliveries_CRUD_System';

  constructor(private router: Router) {}
  
  navigateToDeliveries() {
  this.router.navigate(['/deliveries']);
}

navigateToPurchaseOrders() {
  this.router.navigate(['/purchaseOrders']);
}
}
