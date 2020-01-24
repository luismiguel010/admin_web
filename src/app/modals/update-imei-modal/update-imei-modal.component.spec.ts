import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateImeiModalComponent } from './update-imei-modal.component';

describe('UpdateImeiModalComponent', () => {
  let component: UpdateImeiModalComponent;
  let fixture: ComponentFixture<UpdateImeiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateImeiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateImeiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
