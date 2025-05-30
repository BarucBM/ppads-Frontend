import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDmComponent } from './friends-dm.component';

describe('FriendsDmComponent', () => {
  let component: FriendsDmComponent;
  let fixture: ComponentFixture<FriendsDmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsDmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsDmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
