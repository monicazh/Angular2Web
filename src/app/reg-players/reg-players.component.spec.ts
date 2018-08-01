import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPlayersComponent } from './reg-players.component';

describe('RegPlayersComponent', () => {
  let component: RegPlayersComponent;
  let fixture: ComponentFixture<RegPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
