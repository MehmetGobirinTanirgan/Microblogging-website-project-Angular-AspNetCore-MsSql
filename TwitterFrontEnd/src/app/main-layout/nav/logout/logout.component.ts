import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/core/models/UserInfo';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(public authService: AuthenticationService, private router: Router) {}

  userInfo: UserInfo;

  ngOnInit(): void {
    const authenticatedUserInfos = this.authService.getAuthenticatedUserInfos();
    if (authenticatedUserInfos != null) {
      this.userInfo = authenticatedUserInfos;
    } else {
      alert('Local storage error');
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
