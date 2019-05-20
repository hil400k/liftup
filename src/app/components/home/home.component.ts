import { Component, OnInit } from '@angular/core';
import { RequestsUtilService } from '../../services/requests-util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news;

  constructor(
    private requestsUtil: RequestsUtilService
  ) { }

  ngOnInit() {
    this.requestsUtil.getRequest('news')
      .subscribe(data => {
        this.news = data;
      });
  }
}
