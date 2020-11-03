import { Component, Input, OnInit } from '@angular/core';

export * from './content/hero-banner-content.component';
export * from './link/hero-banner-link.component';

@Component({
  selector: 'goa-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class GoAHeroBannerComponent implements OnInit {

  @Input() title: string;
  @Input() backgroundUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
