import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsSupportComponent } from './os-support.component';

describe('OperatingSystemComponent', () => {
  let component: OsSupportComponent;
  let fixture: ComponentFixture<OsSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
