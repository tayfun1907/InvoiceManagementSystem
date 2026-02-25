import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInsertComponent } from './invoice-insert.component';

describe('InvoiceInsertComponent', () => {
  let component: InvoiceInsertComponent;
  let fixture: ComponentFixture<InvoiceInsertComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceInsertComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
