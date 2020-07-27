import { Component, OnInit, Input } from '@angular/core';
import { FooterImages } from './inlineImages'


@Component({
    selector: 'goa-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class GoAFooterComponent implements OnInit {

    @Input() base64Images: object = FooterImages

    /**
     * The serviceName might need to be hard coded in the HTML.
    */
    @Input() serviceName = "Digital Service Name (microsite)"

    constructor() { }

    ngOnInit() { }
}