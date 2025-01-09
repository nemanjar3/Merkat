import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasUpdateComponent } from './oglas-update.component';

describe('OglasUpdateComponent', () => {
  let component: OglasUpdateComponent;
  let fixture: ComponentFixture<OglasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OglasUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OglasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
