import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparepartListComponent } from './sparepart-list.component';

describe('SparepartListComponent', () => {
  let component: SparepartListComponent;
  let fixture: ComponentFixture<SparepartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparepartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparepartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
