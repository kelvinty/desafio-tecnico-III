import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExames } from './lista-exames';

describe('ListaExames', () => {
  let component: ListaExames;
  let fixture: ComponentFixture<ListaExames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaExames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaExames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
