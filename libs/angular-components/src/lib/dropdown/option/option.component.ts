import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'goa-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Option component with to use with GoADropdown
 */
export class GoAOptionComponent implements OnInit {
  /**
   * The unique id of the option;
   */
  @Input() id: string = '';

  /**
   * The value for the option
   */
  @Input() value: any; 

  /**
   * Is the option selected by default?
   */
  @Input() defaultSelected: boolean;

  /**
   * The option template
   */
  @ViewChild('optionTemplate') optionTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
