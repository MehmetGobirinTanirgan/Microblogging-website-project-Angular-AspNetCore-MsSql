import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReplyModalModel } from 'src/models/ReplyModalModel';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
  styleUrls: ['./reply-modal.component.css'],
})
export class ReplyModalComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild('replyModal')
  private modalContent: TemplateRef<ReplyModalComponent>;
  private modalRef: NgbModalRef;
  replyModalData: ReplyModalModel;
  replyForm:FormGroup;
  ngOnInit(): void {}

  open() {
    this.replyModalData = JSON.parse(this.dataService.replyModaldata);
    this.createReplyForm();
    this.modalRef = this.modalService.open(this.modalContent);
    this.modalRef.result.then();
  }

  createReplyForm() {
    this.replyForm = this.formBuilder.group({
      replyTweetDetail: ['', [Validators.maxLength(280)]],
      replyTweetImageFiles: [],
    });
  }
  addReply() {}
}
