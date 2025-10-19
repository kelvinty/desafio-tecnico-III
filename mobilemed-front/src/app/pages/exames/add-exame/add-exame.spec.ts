import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExame } from './add-exame';

describe('AddExame', () => {
  let component: AddExame;
  let fixture: ComponentFixture<AddExame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
