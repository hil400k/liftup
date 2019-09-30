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
  serverErr;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe(resp => {
      this.userLoaded = true;
      this.user = resp && resp.user;
    });
  }

  login(data) {
    this.auth.login(data.email, data.password).subscribe(resp => {
      console.info(resp, '...');
    }, error => {
      this.serverErr = this.getErrorMessage(error);
    });
  }

  signup(data) {
    this.auth.signup(data.email, data.password)
      .subscribe(resp => {

      }, err => {
        this.serverErr = err.message;
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.auth.logout();
  }

  getErrorMessage(err) {
    const defMessage = 'Something was wrong';

    if (err) {
      switch (err.status) {
        case 400:
          return 'Email or password is wrong';
        default:
          return defMessage;
      }
    }
    return defMessage;
  }
}
