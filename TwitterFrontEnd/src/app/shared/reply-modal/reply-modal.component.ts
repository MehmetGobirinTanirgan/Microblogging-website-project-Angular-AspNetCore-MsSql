import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReplyModal } from 'src/app/core/models/ReplyModal';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
  styleUrls: ['./reply-modal.component.css'],
  providers: [TweetService],
})
export class ReplyModalComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private tweetService: TweetService,
    private validatorService: ValidatorService
  ) {}

  @ViewChild('replyModal')
  private modalContent: TemplateRef<ReplyModalComponent>;
  private modalRef: NgbModalRef;
  replyModalData: ReplyModal;
  replyForm: FormGroup;
  imageFiles: FileList;
  tweetImgWidth: number;
  ngOnInit(): void {}

  open() {
    this.replyModalData = JSON.parse(this.dataService.replyModalData);
    this.createReplyForm();
    this.modalRef = this.modalService.open(this.modalContent);
    this.tweetImgWidth = 100 / this.replyModalData.mainTweetImagePaths.length;
  }

  createReplyForm() {
    this.replyForm = this.formBuilder.group(
      {
        replyTweetDetail: ['', [Validators.maxLength(280)]],
        replyTweetImageFiles: [],
      },
      {
        validator: this.validatorService.atLeastOne(Validators.required, ['replyTweetDetail', 'replyTweetImageFiles']),
      }
    );
  }

  addFiles(files: FileList) {
    if (files != null) {
      this.imageFiles = files;
    }
  }

  addReply() {
    const username = this.authService.getAuthenticatedUserInfos()?.username;
    if (username) {
      if (this.replyForm.valid) {
        const replyData = Object.assign({}, this.replyForm.value);
        const formData = new FormData();
        formData.append('TweetDetail', replyData.replyTweetDetail);
        formData.append('Username', username);
        formData.append('MainTweetID', this.replyModalData.mainTweetID);
        if (this.imageFiles != null) {
          for (let i = 0; i < this.imageFiles.length; i++) {
            formData.append('ImageFiles', this.imageFiles[i]);
          }
        }
        this.tweetService.addReplyTweet(formData).subscribe(
          (data) => {
            this.dataService.setNewReplyTweet(data);
            this.modalRef.close();
          },
          (error) => {
            alert('Reply process failed');
          }
        );
      }
    } else {
      alert('Local storage error');
    }
  }
}
