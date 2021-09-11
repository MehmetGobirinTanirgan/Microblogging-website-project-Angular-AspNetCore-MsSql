import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreModel } from 'src/models/UserStoreModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { CustomValidatorService } from 'src/services/customValidator.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-tweet-editor',
  templateUrl: './tweet-editor.component.html',
  styleUrls: ['./tweet-editor.component.css'],
  providers: [TweetService],
})
export class TweetEditorComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private validatorService: CustomValidatorService,
  ) {}
  @Output() addedNewTweet: EventEmitter<any> = new EventEmitter();
  tweetSubmitForm: FormGroup;
  userData: UserStoreModel;
  imageFiles: FileList;
  tweetTextLength: number = 0;
  circleColor: string;
  @ViewChild('circleProg') circleBar: ElementRef;
  ngOnInit(): void {
    const _userData = this.authService.getUserData();
    if (_userData != null) {
      this.userData = _userData;
      this.createTweetSubmitForm();
      this.circleColor = '#1D9BF0';
    } else {
      alert('Local storage error');
    }
  }

  createTweetSubmitForm() {
    this.tweetSubmitForm = this.formBuilder.group(
      {
        tweetDetail: ['', [Validators.maxLength(280)]],
        imageFiles: [],
      },
      {
        validator: this.validatorService.atLeastOne(Validators.required, [
          'tweetDetail',
          'imageFiles',
        ]),
      }
    );
  }

  addFiles(files: FileList) {
    if (files != null) {
      this.imageFiles = files;
    }
  }

  tweetSubmit() {
    if (this.tweetSubmitForm.valid) {
      const newTweet = Object.assign({}, this.tweetSubmitForm.value);
      const formData = new FormData();
      formData.append('UserID', this.userData.id);
      formData.append('TweetDetail', newTweet.tweetDetail);

      if (this.imageFiles != null) {
        for (let i = 0; i < this.imageFiles.length; i++) {
          formData.append('ImageFiles', this.imageFiles[i]);
        }
      }

      this.tweetService.addNewTweet(formData).subscribe(
        (data) => {
          this.tweetSubmitForm.reset();
          this.addedNewTweet.emit(JSON.stringify(data));
        },
        (error) => {
          alert('Error: Tweet posting failed');
        }
      );
    }
  }

  countTextLength(tweetText: string) {
    this.tweetTextLength = tweetText.length;
    let circlBarEl = this.circleBar.nativeElement;
    if (tweetText.length > 260 && tweetText.length < 280) {
      this.circleColor = '#FFD400';
    } else if(tweetText.length > 280){
      this.circleColor = '#F42E3B';
    }
  }
}
