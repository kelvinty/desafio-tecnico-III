import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagaExame } from './apaga-exame';

describe('ApagaExame', () => {
  let component: ApagaExame;
  let fixture: ComponentFixture<ApagaExame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApagaExame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApagaExame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
