import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUpdateComponent } from './invoice-update.component';

describe('InvoiceUpdateComponent', () => {
  let component: InvoiceUpdateComponent;
  let fixture: ComponentFixture<InvoiceUpdateComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceUpdateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
