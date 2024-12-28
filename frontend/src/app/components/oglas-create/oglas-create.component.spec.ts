import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasCreateComponent } from './oglas-create.component';

describe('OglasCreateComponent', () => {
  let component: OglasCreateComponent;
  let fixture: ComponentFixture<OglasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OglasCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OglasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
