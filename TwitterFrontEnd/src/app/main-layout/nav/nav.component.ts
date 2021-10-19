import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }
  id:string;
  ngOnInit(): void {
    const userID =this.authService.getUserData()?.id;
    if(userID != null){
      this.id = userID;
    }else{
      alert("Local storage error");
    }
  }


}
