import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService, private dataService: DataService) {}

  ngOnInit() {
    this.spinner.show();
    this.dataService.getLoadingFlag().subscribe((res) => {
      if (res) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
