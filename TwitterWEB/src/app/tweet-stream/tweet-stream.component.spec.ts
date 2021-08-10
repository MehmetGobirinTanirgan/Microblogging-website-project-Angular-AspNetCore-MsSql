import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetStreamComponent } from './tweet-stream.component';

describe('TweetStreamComponent', () => {
  let component: TweetStreamComponent;
  let fixture: ComponentFixture<TweetStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
