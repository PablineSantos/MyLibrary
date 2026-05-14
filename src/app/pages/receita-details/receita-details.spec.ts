import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaDetails } from './receita-details';

describe('ReceitaDetails', () => {
  let component: ReceitaDetails;
  let fixture: ComponentFixture<ReceitaDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceitaDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
