import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InvoiceInsertComponent } from './invoice-insert/invoice-insert.component';
import { InvoiceUpdateComponent } from './invoice-update/invoice-update.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'invoice-list', component: InvoiceListComponent, canActivate: [authGuard] },
  { path: 'invoice-insert', component: InvoiceInsertComponent, canActivate: [authGuard] },
  { path: 'invoice-update', component: InvoiceUpdateComponent, canActivate: [authGuard] },
  { path: 'invoice-update/:id', component: InvoiceUpdateComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];