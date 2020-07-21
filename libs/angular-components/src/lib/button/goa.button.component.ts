import { Component, OnInit, Input } from '@angular/core';
import { Button } from './button';
import ButtonHtml from './goa.button.component.html'
import ButtonStyle from './goa.button.component.css'

@Component({
  moduleId: module.id,
  selector: 'goa-button',
  template: ButtonHtml,
  styles: [ButtonStyle.toString()]
})

export class GoAButtonComponent implements OnInit {
  @Input() title: string;
  @Input() buttonType: string = 'primary';

  constructor() { }

  ngOnInit() { }
}