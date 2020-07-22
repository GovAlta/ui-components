import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'goa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class GoAButtonComponent implements OnInit {
  /**
   * Text to display in the button
   */
  @Input() title: string;

  /**
   * The appearance style of the button.
   */
  @Input() buttonType: 'primary' | 'secondary' | 'tertiary' = 'primary';

  constructor() { }

  ngOnInit() { }
}