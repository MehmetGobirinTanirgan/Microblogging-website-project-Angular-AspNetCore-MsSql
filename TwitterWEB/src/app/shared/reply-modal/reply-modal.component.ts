import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReplyModalModel } from 'src/models/ReplyModalModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';

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
    private tweetService: TweetService
  ) {}
  @ViewChild('replyModal')
  private modalContent: TemplateRef<ReplyModalComponent>;
  private modalRef: NgbModalRef;
  replyModalData: ReplyModalModel;
  replyForm: FormGroup;
  imageFiles: FileList;
  ngOnInit(): void {}

  open() {
    this.replyModalData = JSON.parse(this.dataService.replyModalData);
    this.createReplyForm();
    this.modalRef = this.modalService.open(this.modalContent);
  }

  createReplyForm() {
    this.replyForm = this.formBuilder.group({
      replyTweetDetail: ['', [Validators.maxLength(280)]],
      replyTweetImageFiles: [],
    });
  }

  addFiles(files: FileList) {
    if (files != null) {
      this.imageFiles = files;
    }
  }

  addReply() {
    const userID = this.authService.getUserData()?.id;
    if (userID != null) {
      if (this.replyForm.valid) {
        const replyData = Object.assign({}, this.replyForm.value);
        const formData = new FormData();
        formData.append('TweetDetail', replyData.replyTweetDetail);
        formData.append('UserID', userID);
        formData.append('MainTweetID', this.replyModalData.MainTweetID);
        if (this.imageFiles != null) {
          for (let i = 0; i < this.imageFiles.length; i++) {
            formData.append('ImageFiles', this.imageFiles[i]);
          }
        }
        this.tweetService.addReplyTweet(formData).subscribe(
          (data) => {
            alert('Replied successfully');
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
