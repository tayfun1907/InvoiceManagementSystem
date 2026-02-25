import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth'; 
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})
export class InvoiceListComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router); 
  
  invoices: any[] = []; 
  showDeleteModal = false;
  selectedInvoiceId: number | null = null;

  ngOnInit() {
    this.loadInvoices();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout hatası:', err);
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  deleteInvoice(id: number) {
    this.authService.deleteInvoice(id).subscribe({
      next: () => {
        this.invoices = this.invoices.filter(x => x.invoiceId !== id);
      },
      error: (err: any) => {
        console.error(err);
        alert('Silme işlemi sırasında bir hata oluştu.');
      }
    });
  }
  
  loadInvoices() {
    const end = new Date().toISOString();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    const startStr = start.toISOString();

    this.authService.getInvoices(startStr, end).subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (err) => console.error('Liste yüklenirken hata:', err)
    });
  }

  openDeleteModal(id: number) {
    this.selectedInvoiceId = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedInvoiceId) {
      this.deleteInvoice(this.selectedInvoiceId);
      this.closeModal();
    }
  }

  closeModal() {
    this.showDeleteModal = false;
    this.selectedInvoiceId = null;
  }
}