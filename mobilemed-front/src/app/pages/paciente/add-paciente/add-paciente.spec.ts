import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaciente } from './add-paciente';

describe('AddPaciente', () => {
  let component: AddPaciente;
  let fixture: ComponentFixture<AddPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
