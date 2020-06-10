import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemComponent } from './ordem.component';

describe('OrdemComponent', () => {
  let component: OrdemComponent;
  let fixture: ComponentFixture<OrdemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
