import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-invoice-insert',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './invoice-insert.html',
  styleUrl: './invoice-insert.css'
})
export class InvoiceInsertComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  invoice = {
    CustomerId: 0,
    InvoiceNumber: '',
    InvoiceDate: new Date().toISOString().split('T')[0],
    TotalAmount: 0,
    Lines: [] as any[] 
  };

  newLine = {
    ItemName: '',
    Quentity: 1,
    Price: 0
  };

  addLine() {
    if (this.newLine.ItemName && this.newLine.Quentity > 0) {
      this.invoice.Lines.push({ ...this.newLine });
      this.calculateTotal();      this.newLine = { ItemName: '', Quentity: 1, Price: 0 };
    }
  }

  removeLine(index: number) {
    this.invoice.Lines.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.invoice.TotalAmount = this.invoice.Lines.reduce(
      (sum, item) => sum + (item.Quentity * item.Price), 0
    );
  }

  onSave() {
    if (this.invoice.Lines.length === 0) {
      alert("Lütfen en az bir fatura kalemi ekleyin!");
      return;
    }

    this.authService.saveInvoice(this.invoice).subscribe({
      next: (res) => {
        this.router.navigate(['/invoice-list']);
      },
      error: (err) => alert("Hata: " + err.error)
    });
  }
}