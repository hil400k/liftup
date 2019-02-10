import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent {
  @Input() name: String;
  @Input() width: String;
  @Input() height: String;

  constructor() {}

  get absUrl() {
    return window.location.href;
  }
}
