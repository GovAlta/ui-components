import { Component, OnInit, Input } from '@angular/core';
import { FooterImages } from './inlineImages'


@Component({
    selector: 'goa-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class GoAFooterComponent implements OnInit {
    /**
     * Text to display in the button
     */
    @Input() base64Images: object = FooterImages
    @Input() serviceName = "Digital Service Name (microsite)"

    constructor() { }

    ngOnInit() { }
}