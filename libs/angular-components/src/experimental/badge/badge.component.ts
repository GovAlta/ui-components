import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'goa-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoABadgeComponent implements OnInit {
  @Input() type:
    'information'
    | 'success'
    | 'warning'
    | 'emergency'
    | 'dark'
    | 'midtone'
    | 'light'
    | 'inactive' = 'light';

  constructor() { }

  get badgeClass(): string {
    return `badge-${this.type}`;
  }

  /* eslint-disable @angular-eslint/no-empty-lifecycle-method */
  ngOnInit() { }
}
