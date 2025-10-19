import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarPaciente } from './apagar-paciente';

describe('ApagarPaciente', () => {
  let component: ApagarPaciente;
  let fixture: ComponentFixture<ApagarPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApagarPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApagarPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
