import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user;
  userLoaded;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userLoaded = true;
      this.user = user;
    });
  }

  login(data) {
    this.auth.login(data.email, data.password);
  }

  signup(data) {
    this.auth.signup(data.email, data.password);
  }

  logout() {
    this.auth.logout();
  }
}
