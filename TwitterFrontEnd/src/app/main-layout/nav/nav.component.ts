import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  username: string;

  ngOnInit(): void {
    const authenticatedUsername = this.authService.getAuthenticatedUserInfos()?.username;

    if (authenticatedUsername != null) {
      this.username = authenticatedUsername;
    } else {
      alert('Local storage error');
    }
  }
}
