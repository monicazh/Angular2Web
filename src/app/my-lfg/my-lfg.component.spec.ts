import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLfgComponent } from './my-lfg.component';

describe('MyLfgComponent', () => {
  let component: MyLfgComponent;
  let fixture: ComponentFixture<MyLfgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLfgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
