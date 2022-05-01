import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaillerPatientComponent } from './mailler-patient.component';

describe('MaillerPatientComponent', () => {
  let component: MaillerPatientComponent;
  let fixture: ComponentFixture<MaillerPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaillerPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaillerPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
