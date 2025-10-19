import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExame } from './update-exame';

describe('UpdateExame', () => {
  let component: UpdateExame;
  let fixture: ComponentFixture<UpdateExame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateExame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
