import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoDTO } from 'src/dtos/UserInfoDTO';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(public authService: AuthenticationService, private router: Router) {}

  userInfo: UserInfoDTO;

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
