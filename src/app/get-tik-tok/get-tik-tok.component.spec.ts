import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTikTokComponent } from './get-tik-tok.component';

describe('GetTikTokComponent', () => {
  let component: GetTikTokComponent;
  let fixture: ComponentFixture<GetTikTokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTikTokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTikTokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
