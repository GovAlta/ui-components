import { Component, OnInit, Input } from '@angular/core';
import { Button } from './button';
import ButtonHtml from './goa.button.component.html'
import ButtonStyle from './goa.button.component.css'

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