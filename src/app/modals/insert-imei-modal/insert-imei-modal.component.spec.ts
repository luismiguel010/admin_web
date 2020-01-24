import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertImeiModalComponent } from './insert-imei-modal.component';

describe('InsertImeiModalComponent', () => {
  let component: InsertImeiModalComponent;
  let fixture: ComponentFixture<InsertImeiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertImeiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertImeiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
