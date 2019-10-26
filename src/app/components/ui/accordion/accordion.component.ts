import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() title: string;
  @Input() opened: boolean;

  state: boolean = false;

  constructor() { }

  ngOnInit() {

    if (this.opened) {
      this.state = this.opened;
    }
  }

  changeState() {
    this.state = !this.state;
  }
}
