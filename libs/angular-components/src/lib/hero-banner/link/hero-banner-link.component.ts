import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'goa-hero-banner-link',
  templateUrl: './hero-banner-link.component.html',
  styleUrls: ['./hero-banner-link.component.scss']
})
export class GoAHeroBannerLinkComponent implements OnInit {

  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
  }

}
