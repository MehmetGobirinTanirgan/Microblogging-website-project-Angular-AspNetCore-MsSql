import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreModel } from 'src/models/UserStoreModel';
import { AuthenticationService } from 'src/services/authentication.service';
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
  ) {}
  tweetSubmitForm: FormGroup;
  userData: UserStoreModel;
  imageFiles: FileList;
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.createTweetSubmitForm();
  }

  createTweetSubmitForm() {
    this.tweetSubmitForm = this.formBuilder.group({
      tweetDetail: ['', [Validators.maxLength(280)]],
      imageFiles: [],
    });
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
        (success) => {
          alert('Succes');
          this.tweetSubmitForm.reset();
        },
        (error) => {
          alert('Error');
        }
      );
    }
  }
}
