import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private http = inject(HttpClient);
  
  private apiUrl = 'https://localhost:7264/api/Auth'; 

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  getInvoices(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7264/api/Invoice/list?startDate=${startDate}&endDate=${endDate}`);
  }
  saveInvoice(invoiceData: any): Observable<any> {
    return this.http.post('https://localhost:7264/api/Invoice/save', invoiceData);
  }
  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7264/api/Invoice/delete/${id}`);
  }
  
  getInvoiceById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7264/api/Invoice/get/${id}`);
  }

  updateInvoice(invoice: any): Observable<any> {
    return this.http.put(`https://localhost:7264/api/Invoice/update`, invoice);
  }
  
  logout() {
  return this.http.post(`${this.apiUrl}/logout`, {});
}
}