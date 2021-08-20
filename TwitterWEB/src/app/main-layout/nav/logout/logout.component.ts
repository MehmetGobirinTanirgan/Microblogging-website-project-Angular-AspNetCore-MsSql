import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreModel } from 'src/models/UserStoreModel';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  userData: UserStoreModel;

  ngOnInit(): void {
    const _userData = this.authService.getUserData();
    if (_userData != null) {
      this.userData = _userData;
    } else {
      alert('Local storage error');
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
