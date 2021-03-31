import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'goa-app-version-header',
  templateUrl: './app-version-header.component.html',
  styleUrls: ['./app-version-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoAAppVersionHeaderComponent implements OnInit {
  @Input() isProdEnvironment = false;
  @Input() environment = '';
  @Input() version = '';

  @Output() closed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.closed.next(true);
  }
}
