import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {
  constructor(private ngbModal: NgbModal) {}
  openModal(modalName:any) {
    this.ngbModal.open(modalName,{ centered: true });
  }

  closeModal(modalName:any){
    this.ngbModal.dismissAll();
  }
}
