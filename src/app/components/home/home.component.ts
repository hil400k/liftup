import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RequestsUtilService } from '../../services/requests-util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news;
  pounds;
  kgs;

  constructor(
    private requestsUtil: RequestsUtilService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.requestsUtil.getRequest('news')
      .subscribe(data => {
        this.news = data;
      });
  }

  poundsChange(val) {
    const value = Number(val);
    if (!value) {
      this.kgs = '';
    } else {
      this.kgs = (Number(value) * 0.4535).toFixed(2);
    }
  }

  kgsChange(val) {
    const value = Number(val);
    if (!value) {
      this.pounds = '';
    } else {
      this.pounds = (Number(value) * 2.2046).toFixed(2);
    }
  }

  getSanitized(code) {
    return this._sanitizer.bypassSecurityTrustHtml(code);
  }
}
