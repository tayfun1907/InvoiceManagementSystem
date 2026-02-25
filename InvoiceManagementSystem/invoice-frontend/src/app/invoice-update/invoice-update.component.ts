import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth'; 
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-update',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './invoice-update.html',
  styleUrl: './invoice-update.css'
})
export class InvoiceUpdateComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  invoice: any = {
    invoiceId: 0,
    invoiceNumber: '',
    customerId: 0,
    invoiceDate: '',
    totalAmount: 0,
    lines: []
  };

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getInvoice(id);
    }
  }

  getInvoice(id: number) {
  this.authService.getInvoiceById(id).subscribe({
    next: (data: any) => {
      this.invoice = data;
      
      if (data.invoiceDate) {
        this.invoice.invoiceDate = data.invoiceDate.split('T')[0];
      }
    }
  });
}

  addLine() {
    this.invoice.lines.push({ itemName: '', quentity: 1, price: 0 });
  }

  removeLine(index: number) {
    this.invoice.lines.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.invoice.totalAmount = this.invoice.lines.reduce((acc: any, curr: any) => acc + (curr.quentity * curr.price), 0);
  }

  onUpdate() {
    this.authService.updateInvoice(this.invoice).subscribe({
      next: () => {
        this.router.navigate(['/invoice-list']);
      },
      error: (err: any) => alert("Güncelleme hatası!")
    });
  }
  isInvoiceValid(): boolean {
    if ((this.invoice.customerId || 0) <= 0 || !this.invoice.lines || this.invoice.lines.length === 0) {
      return false;
    }
   
    return this.invoice.lines.every((line: any) => 
      line.itemName && 
      line.itemName.trim() !== '' && 
      line.quentity > 0 && 
      line.price > 0
    );
  }
}