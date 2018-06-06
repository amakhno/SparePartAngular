import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePartFormComponent } from './spare-part-form.component';

describe('SparePartFormComponent', () => {
  let component: SparePartFormComponent;
  let fixture: ComponentFixture<SparePartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparePartFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparePartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
