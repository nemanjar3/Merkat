import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasDetaljiComponent } from './oglas-detalji.component';

describe('OglasDetaljiComponent', () => {
  let component: OglasDetaljiComponent;
  let fixture: ComponentFixture<OglasDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OglasDetaljiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OglasDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
