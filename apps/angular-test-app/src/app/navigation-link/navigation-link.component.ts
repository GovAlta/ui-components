import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-link',
  templateUrl: './navigation-link.component.html',
  styleUrls: ['./navigation-link.component.css']
})
export class NavigationLinkComponent implements OnInit {

  @Input() label: string = "";
  @Input() path: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
