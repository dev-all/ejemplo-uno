import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevformComponent } from './devform.component';

describe('DevformComponent', () => {
  let component: DevformComponent;
  let fixture: ComponentFixture<DevformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
