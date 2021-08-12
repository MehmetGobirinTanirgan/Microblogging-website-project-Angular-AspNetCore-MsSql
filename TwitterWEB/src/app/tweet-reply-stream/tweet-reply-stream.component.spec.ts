import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetReplyStreamComponent } from './tweet-reply-stream.component';

describe('TweetReplyStreamComponent', () => {
  let component: TweetReplyStreamComponent;
  let fixture: ComponentFixture<TweetReplyStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetReplyStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetReplyStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
