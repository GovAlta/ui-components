import { Component, OnInit, Input } from '@angular/core';

/***
Paul.Li July-20-2020

Note: Ideally, we shall use 
@Component({
  selector: 'goa-button',
  templateUrl: <html_path>,
  styles: [<style_file_path>]
})

to include the html and style templates into the component.
However, Paul faced a 404 issue (cannot template files) when tried to include them based on Url.
Using 'template' and 'styles' to include templates is a temporarily workaround.
***/

@Component({
  selector: 'goa-button',
  templateUrl: './goa.button.component.html',
  styleUrls: ['./goa.button.component.scss'],
})
export class GoAButtonComponent implements OnInit {
  @Input() title: string;
  @Input() buttonType = 'primary';

  constructor() {}

  ngOnInit() {}
}
